/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook"
import { burgerActions } from "../../store/actions/plugins/burgerActions"
import { ID } from "../../models/plugins"
import { AnyFunction } from "../../types"
import { Methods } from "../../tools/methods"

interface BurgerProperties extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
  idState: ID
  mediaQuery?: {
    size?: number
    type?: "min" | "max"
  }
  onMatches?: AnyFunction
  isLoad: boolean
}

const customBurgerProperties: Array<keyof BurgerProperties> = ["idState", "mediaQuery", "onMatches", "isLoad"]

const Burger : React.FC<BurgerProperties> = props => {
  const actions = burgerActions(useAppDispatch())
  const result = useAppSelector(state => state.burgers[state.burgers.findIndex(spoiler => spoiler.id === props.idState)])
  const mediaQuery = window.matchMedia(`(${props?.mediaQuery?.type || "max"}-width: ${props?.mediaQuery?.size || 0}px)`)
  const [matches, setMatches] = useState(mediaQuery.matches)

  useEffect(() => {
    result !== undefined
      ? actions.load(result)
      : actions.add({ id: props.idState, load: props.isLoad })

    mediaQuery.addEventListener("change", mediaQueryHandler)

    return () => mediaQuery.removeEventListener("change", mediaQueryHandler)
  }, [])

  function mediaQueryHandler(event: MediaQueryListEvent): void {
    setMatches(event.matches)
    props.onMatches && props.onMatches()
  }

  return <div {...Methods.filterObject(props, customBurgerProperties)} className={`burger-dropdown ${result?.open ? "open" : ""} ${matches ? "media" : ""} ${props?.className || ""}`.trim()}>{props.children || null}</div>
}

interface BurgerTargetProperties extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
  idState: ID
  onTarget?: AnyFunction
}

const customBurgerTargetProperties: Array<keyof BurgerTargetProperties> = ["idState", "onTarget"]

export const BurgerTarget : React.FC<BurgerTargetProperties> = props => {
  const actions = burgerActions(useAppDispatch())
  const result = useAppSelector(state => state.burgers[state.burgers.findIndex(spoiler => spoiler.id === props.idState)])

  useEffect(() => {
    result !== undefined && actions.load(result)
  }, [])

  function clickHandler() {
    result.open
      ? actions.close(props.idState)
      : actions.open(props.idState)
    props.onTarget && props.onTarget()
  }

  return (
    <div {...Methods.filterObject(props, customBurgerTargetProperties)} className={`burger ${result?.open ? "open" : ""} ${props?.className || ""}`.trim()} onClick={Methods.concatFunctions(clickHandler, props?.onClick || null)}>
      {props?.children || <span className="burger-line"></span>}
    </div>
  )
}

export default Burger