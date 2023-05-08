/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook"
import { tabsActions } from "../../store/actions/plugins/tabsAction"
import { ID } from "../../models/plugins"
import { Methods } from "../../tools/methods"
import { AnyFunction, AnyObject } from "../../types"

export interface TabsProperties extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
  idState: ID
  onTab?: AnyFunction
  isLoad: boolean
}

const customTabsProperties: Array<keyof TabsProperties> = ["idState", "onTab", "isLoad"]

const Tabs : React.FC<TabsProperties> = props => {
  const actions = tabsActions(useAppDispatch())
  const result = useAppSelector(state => state.tabs[state.tabs.findIndex(tabs => tabs.id === props.idState)])
  const children : Array<React.ReactElement> = Array.isArray(props?.children) ? props?.children : [props?.children]

  if (children.filter(el => el.type === TabsInput).length !== 1 || children.filter(el => el.type === TabsContent).length !== 1 || !(Array.isArray(children.find(el => el.type === TabsInput)!.props?.children) && Array.isArray(children.find(el => el.type === TabsContent)!.props?.children)) || children.find(el => el.type === TabsInput)!.props?.children.length !== children.find(el => el.type === TabsContent)!.props?.children.length) return <React.Fragment/>

  useEffect(() => {
    result !== undefined
      ? actions.load(result)
      : actions.add({ id: props.idState, load: props.isLoad })

    const selectedItem = children.find(el => el.type === TabsInputItem && el.props.selected)
    selectedItem && actions.tab({...result, tab: selectedItem.props.selected})
  }, [])

  function clickHandler(id: number): void {
    actions.tab({...result, tab: id})
    props.onTab && props.onTab()
  }

  return (
    <div {...Methods.filterObject(props, customTabsProperties)} style={{
      "--count": children.find(el => el.type === TabsInput)!.props?.children.length,
      "--tab": result.tab
    } as React.CSSProperties} className={`tabs ${props?.className || ""}`.trim()}>
      {children ? children
        .filter(el => el.type === TabsInput)
        .map(el => <ul
          {...el.props}
          key={0}
          className={`tabs-input ${el.props?.className || ""}`.trim()}
        >{el.props.children
          .filter((li: { type: React.FC<TabsInputItemProperties> }) => li.type === TabsInputItem)
          .map((li: { props: TabsInputItemProperties }) => <li
            {...Methods.filterObject(li.props, customTabsItemProperties)}
            key={li.props.idItem}
            className={`tabs-input-item ${li.props.idItem === result?.tab ? "open" : ""} ${el.props?.className || ""}`.trim()}
            onClick={Methods.concatFunctions(() => clickHandler(li.props.idItem), li.props.onClick || null)}
          >{li.props?.children || null}</li>) || null}</ul>) : null}
      {children ? children
        .filter(el => el.type === TabsContent)
        .map(el => <ul
          {...el.props}
          key={0}
          className={`tabs-content ${el.props?.className || ""}`.trim()}
        >{el.props.children
          .filter((li: { type: React.FC<TabsContentItemProperties> }) => li.type === TabsContentItem)
          .map((li: { props: TabsContentItemProperties }) => <li
            {...Methods.filterObject(li.props, customTabsItemProperties)}
            key={li.props.idItem}
            className={`tabs-content-item ${el.props?.className || ""}`.trim()}
          >{li.props?.children || null}</li>) || null}</ul>) : null}
    </div>
  )
}

type TabsInputProperties = React.PropsWithChildren & React.HTMLAttributes<HTMLUListElement>
export const TabsInput: React.FC<TabsInputProperties> = props => <React.Fragment/>

interface TabsInputItemProperties extends React.PropsWithChildren, React.HTMLAttributes<HTMLLIElement> {
  idItem: number
  selected?: boolean
}

export const TabsInputItem: React.FC<TabsInputItemProperties> = _props => <React.Fragment/>

type TabsContentProperties = React.PropsWithChildren & React.HTMLAttributes<HTMLUListElement>
export const TabsContent: React.FC<TabsContentProperties> = _props => <React.Fragment/>

interface TabsContentItemProperties extends React.PropsWithChildren, React.HTMLAttributes<HTMLLIElement> {
  idItem: number
}

// const customTabsItemProperties: Array<string | number | symbol> = ["item", "selected"]
const customTabsItemProperties: Array<keyof TabsContentItemProperties> = ["idItem"]

export const TabsContentItem: React.FC<TabsContentItemProperties> = _props => <React.Fragment/>

export default Tabs