/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook"
import { showMoreActions } from "../../store/actions/plugins/showMoreActions"
import { ID } from "../../models/plugins"
import { Methods } from "../../tools/methods"
import { AnyFunction } from "../../types"

interface ShowMoreProperties extends React.PropsWithChildren, React.HTMLAttributes<HTMLDetailsElement> {
  idState: ID
  mediaQuery?: {
    size?: number
    type?: "min" | "max"
  }
  onToggle?: AnyFunction
  onMatches?: AnyFunction
  isLoad: boolean
}

const customShowMoreProperties: Array<keyof ShowMoreProperties> = ["idState", "mediaQuery", "onToggle", "onMatches", "isLoad"]

const ShowMore: React.FC<ShowMoreProperties> = props => {
  const actions = showMoreActions(useAppDispatch())
  const result = useAppSelector(state => state.showMores[state.showMores.findIndex(showMore => showMore.id === props.idState)])
  const mediaQuery = window.matchMedia(`(${props?.mediaQuery?.type || "max"}-width: ${props?.mediaQuery?.size || 0}px)`)
  const [matches, setMatches] = useState(mediaQuery.matches)
  const children : Array<React.ReactElement> = Array.isArray(props?.children) ? props?.children : [props?.children]

  if (children.filter(el => el.type === ShowMorePlaceholder).length !== 1 || children.filter(el => el.type === ShowMoreDropdown).length !== 1) return <React.Fragment/>

  useEffect(() => {
    result !== undefined
      ? actions.load(result)
      : actions.add({ id: props.idState, load: props.isLoad })

    mediaQuery.addEventListener("change", mediaQueryHandler)

    return () => mediaQuery.removeEventListener("change", mediaQueryHandler)
  }, [])

  function toggleHandler(event: MouseEvent): void {
    event.preventDefault()
    if (matches) return
    result.open
      ? actions.close(result.id)
      : actions.open(result.id)
    props.onToggle && props.onToggle()
  }

  function mediaQueryHandler(event: MediaQueryListEvent): void {
    setMatches(event.matches)
    props.onMatches && props.onMatches()
  }

  return (
    <details {...Methods.filterObject(props, customShowMoreProperties)} className={`showmore ${result?.open ? "open" : ""} ${matches ? "media" : ""} ${props?.className || ""}`.trim()} open>
      {children ? children
        .filter(el => el.type === ShowMorePlaceholder)
        .map(el => <summary
          {...el.props}
          className={`showmore-placeholder ${el.props?.className || ""}`.trim()}
          key={0}
          onClick={(e: MouseEvent) => Methods.concatFunctions(() => toggleHandler(e), el.props?.onClick || null)()}
        >{el.props?.children || null}</summary>) : null}
      {children ? children
        .filter(el => el.type === ShowMoreDropdown)
        .map(el => <div
          {...el.props}
          className={`showmore-dropdown ${el.props?.className || ""}`.trim()}
          key={0}
        >{el.props?.children || null}</div>) : null}
    </details>
  )
}

type ShowMorePlaceholderProperties = React.PropsWithChildren & React.HTMLAttributes<HTMLElement>
export const ShowMorePlaceholder: React.FC<ShowMorePlaceholderProperties> = _props => <React.Fragment/>

type ShowMoreDropdownProperties = React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>
export const ShowMoreDropdown: React.FC<ShowMoreDropdownProperties> = _props => <React.Fragment/>

export default ShowMore