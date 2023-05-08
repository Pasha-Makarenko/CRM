/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook"
import { counterActions } from "../../store/actions/plugins/counterActions"
import { ID } from "../../models/plugins"
import { AnyFunction } from "../../types"
import { Methods } from "../../tools/methods"

interface CounterProperties extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
  idState: ID
  initialValue: number
  change: {
    sub: number
    add: number
  }
  limit: {
    min: number
    max: number
  }
  inputTime?: number
  onChange?: AnyFunction
  isLoad: boolean
}

const customCounterProperties: Array<keyof CounterProperties> = ["idState", "onChange", "isLoad", "initialValue", "change", "limit", "inputTime"]

const Counter: React.FC<CounterProperties> = props => {
  const actions = counterActions(useAppDispatch())
  const result = useAppSelector(state => state.counters[state.counters.findIndex(spoiler => spoiler.id === props.idState)])
  const children: Array<React.ReactElement> = Array.isArray(props?.children) ? props?.children : [props?.children]
  const [locked, setLocked] = useState(false)
  const [input, setInput] = useState(props.initialValue.toString())
  let timeout: NodeJS.Timeout

  useEffect(() => {
    result !== undefined
      ? actions.load(result)
      : actions.add({id: props.idState, value: props.initialValue, change: props.change, limit: props.limit, load: props.isLoad})
  }, [])

  function subValueHandler(): void {
    if (locked) return
    actions.subValue(props.idState)
    props.onChange && props.onChange()
  }

  function addValueHandler(): void {
    if (locked) return
    actions.addValue(props.idState)
    props.onChange && props.onChange()
  }

  async function setValueHandler(event : ChangeEvent<HTMLInputElement>): Promise<void> {
    await setInput(event.target.value)
    await setLocked(true)

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(async () => {
      await actions.setValue({...result, value: parseFloat(event.target.value) || result.value})
      await setLocked(false)
      props.onChange && props.onChange()
    }, props?.inputTime || 1000)
  }

  useEffect(() => {
    setInput(result?.value.toString())
  }, [result, setInput])

  return (
    <div {...Methods.filterObject(props, customCounterProperties)} className={`counter ${props?.className || ""}`.trim()}>
      {children ? children
        .filter(el => el.type === CounterButton && el.props.typeButton === "sub")
        .map(el => <button
          {...Methods.filterObject(el.props, customCounterButtonProperties)}
          className={`counter-button ${result?.value === result?.limit.min || locked ? "blocked" : ""} ${el.props?.className || ""}`.trim()}
          key={0}
          onClick={Methods.concatFunctions(subValueHandler, el.props?.onClick || null)}
        >{el.props?.children || null}</button>) : null}
      {children ? children
        .filter(el => el.type === CounterInput)
        .map(el => <input
          {...el.props}
          className={`counter-input ${el.props?.className || ""}`.trim()}
          key={0}
          // onChange={async e => await Methods.concatFunctions(async () => setValueHandler(e), el.props?.onChange || null)}
          onChange={e => setValueHandler(e)}
          value={input}
        />) : null}
      {children ? children
        .filter(el => el.type === CounterButton && el.props.typeButton === "add")
        .map(el => <button
          {...Methods.filterObject(el.props, customCounterButtonProperties)}
          className={`counter-button ${result?.value === result?.limit.max || locked ? "blocked" : ""} ${el.props?.className || ""}`.trim()}
          key={0}
          onClick={Methods.concatFunctions(addValueHandler, el.props?.onClick || null)}
        >{el.props?.children || null}</button>) : null}
    </div>
  )
}

interface CounterButtonProperties extends React.PropsWithChildren, React.HTMLAttributes<HTMLButtonElement> {
  typeButton: "add" | "sub"
}
const customCounterButtonProperties: Array<keyof CounterButtonProperties> = ["typeButton"]
export const CounterButton: React.FC<CounterButtonProperties> = _props => <React.Fragment/>

type CounterInputProperties = React.PropsWithChildren & React.HTMLAttributes<HTMLInputElement>
export const CounterInput: React.FC<CounterInputProperties> = _props => <React.Fragment/>

export default Counter