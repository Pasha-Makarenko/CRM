/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook"
import { spoilerActions } from "../../store/actions/plugins/spoilerAction"
import { ID } from "../../models/plugins"
import { Methods } from "../../tools/methods"
import { AnyFunction } from "../../types"

export interface SpoilerProperties extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
  idState: ID
  mediaQuery?: {
    size?: number
    type?: "min" | "max"
  }
  onToggle?: AnyFunction
  onMatches?: AnyFunction
  isLoad: boolean
}

const customSpoilerProperties: Array<keyof SpoilerProperties> = ["idState", "mediaQuery", "onToggle", "onMatches", "isLoad"]

const Spoiler : React.FC<SpoilerProperties> = props => {
  const actions = spoilerActions(useAppDispatch())
  const result = useAppSelector(state => state.spoilers[state.spoilers.findIndex(spoiler => spoiler.id === props.idState)])
  const mediaQuery = window.matchMedia(`(${props?.mediaQuery?.type || "max"}-width: ${props?.mediaQuery?.size || 0}px)`)
  const [matches, setMatches] = useState(mediaQuery.matches)
  const children : Array<React.ReactElement> = Array.isArray(props?.children) ? props?.children : [props?.children]

  if (children.filter(el => el.type === SpoilerInput).length !== 1 || children.filter(el => el.type === SpoilerContent).length !== 1) return <React.Fragment/>

  useEffect(() => {
    result !== undefined
      ? actions?.load(result)
      : actions?.add({ id: props.idState, load: props.isLoad })

    mediaQuery.addEventListener("change", mediaQueryHandler)

    return () => mediaQuery.removeEventListener("change", mediaQueryHandler)
  }, [])

  function toggleHandler(): void {
    if (matches) return
    result.open
      ? actions?.close(result.id)
      : actions?.open(result.id)

    props.onToggle && props.onToggle()
  }

  function mediaQueryHandler(event: MediaQueryListEvent): void {
    setMatches(event.matches)
    props.onMatches && props.onMatches()
  }

  return (
    <div {...Methods.filterObject(props, customSpoilerProperties)} className={`spoiler ${result?.open ? "open" : ""} ${matches ? "media" : ""} ${props?.className || ""}`.trim()}>
      {children ? children
        .filter(el => el.type === SpoilerInput)
        .map(el => <div
          {...el.props}
          className={`spoiler-input ${el.props?.className || ""}`.trim()}
          key={0}
          onClick={Methods.concatFunctions(toggleHandler, el.props?.onClick || null)}
        >{el.props?.children || null}</div>): null}
      {children ? children
        .filter(el => el.type === SpoilerContent)
        .map(el => <div
          {...el.props}
          className={`spoiler-dropdown ${el.props?.className || ""}`.trim()}
          key={0}
        >{el.props?.children || null}</div>) : null}
    </div>
  )
}

type SpoilerInputProperties = React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>
export const SpoilerInput : React.FC<SpoilerInputProperties> = _props => <React.Fragment/>

type SpoilerContentProperties = React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>
export const SpoilerContent : React.FC<SpoilerContentProperties> = _props => <React.Fragment/>

export default Spoiler
