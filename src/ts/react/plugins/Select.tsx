/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook"
import { selectActions } from "../../store/actions/plugins/selectActions"
import { ID } from "../../models/plugins"
import { Methods } from "../../tools/methods"
import { AnyFunction } from "../../types"

interface SelectProperties extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
  idState: ID
  isCloseDropdown?: boolean
  isCloseOverlay?: boolean
  onToggle?: AnyFunction
  onSelect?: AnyFunction
  isLoad: boolean
}

const customSelectProperties: Array<keyof SelectProperties> = ["idState", "isCloseDropdown", "isCloseOverlay", "onToggle", "onSelect", "isLoad"]

const Select : React.FC<SelectProperties> = props => {
  const actions = selectActions(useAppDispatch())
  const result = useAppSelector(state => state.selects[state.selects.findIndex(select => select.id === props.idState)])
  const selectElement = useRef<HTMLDivElement>(null)
  const children : Array<React.ReactElement> = Array.isArray(props?.children) ? props?.children : [props?.children]

  if (children.filter(el => el.type === SelectInput).length !== 1 || children.filter(el => el.type === SelectContent).length !== 1 || !Array.isArray(children.find(el => el.type === SelectContent)?.props?.children) || children.find(el => el.type === SelectContent)?.props?.children.length <= 1) return <React.Fragment/>

  useEffect(() => {
    result !== undefined
      ? actions.load(result)
      : actions.add({ id: props.idState, load: props.isLoad })

    const selectedItem = children.find(el => el.type === SelectItem && el.props.selected)
    selectedItem && actions.select({...result, selected: {
      id: selectedItem.props.idState,
      value: selectedItem.props.value
    }})

    document.addEventListener("click", clickHandler)

    return () => document.removeEventListener("click", clickHandler)
  }, [])

  function toggleHandler(): void {
    result.open
      ? actions.close(result.id)
      : actions.open(result.id)
    props.onToggle && props.onToggle()
  }

  function selectHandler(selected: {id: number, value: number | string | null}): void {
    if (selected.id === result?.selected?.id) return
    actions.select({...result, selected})
    props.isCloseDropdown == true && actions.close(result.id)
    props.onSelect && props.onSelect()
  }

  function clickHandler(event : MouseEvent): void {
    if (props.isCloseOverlay && selectElement.current && !selectElement.current.contains(event.target as Node)) actions.close(result.id)
  }

  return (
    <div {...Methods.filterObject(props, customSelectProperties)} ref={selectElement} className={`select ${result?.open ? "open" : ""} ${props?.className || ""}`.trim()}>
      {children ? children
        .filter(el => el.type === SelectInput)
        .map(el => <div
          {...el.props}
          className={`select-input ${el.props?.className || ""}`.trim()}
          key={0}
          onClick={Methods.concatFunctions(toggleHandler, el.props?.onClick || null)}
        >{el.props?.children || null}</div>) : null}
      {children ? children
        .filter(el => el.type === SelectContent)
        .map(el => <ul
          {...el.props}
          className={`select-dropdown ${el.props?.className || ""}`.trim()}
          key={0}
        >{el.props.children
          .filter((li: { type: React.FC<SelectItemProperties> }) => li.type === SelectItem)
          .map((li: { props: SelectItemProperties }) => <li
            {...Methods.filterObject(li.props, customSelectItemProperties)}
            key={li.props.idItem}
            className={`select-item ${el.props?.className || ""}`.trim()}
            onClick={Methods.concatFunctions(() => selectHandler({id: li.props.idItem, value: el.props?.value || el.props.idItem}), li.props?.onClick || null)}
          >{li.props?.children || null}</li>) || null}</ul>) : null}
    </div>
  )
}

type SelectInputProperties = React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>
export const SelectInput: React.FC<SelectInputProperties> = _props => <React.Fragment/>

type SelectContentProperties = React.PropsWithChildren & React.HTMLAttributes<HTMLUListElement>
export const SelectContent: React.FC<SelectContentProperties> = _props => <React.Fragment/>

interface SelectItemProperties extends React.PropsWithChildren, React.HTMLAttributes<HTMLLIElement> {
  idItem: number
  value?: number | string
  selected?: boolean
}

const customSelectItemProperties: Array<keyof SelectItemProperties> = ["idItem", "value", "selected"]

export const SelectItem: React.FC<SelectItemProperties> = _props => <React.Fragment/>

export default Select