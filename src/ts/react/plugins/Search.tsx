/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ChangeEvent, useEffect, useState, useTransition } from 'react'
import { ID } from "../../models/plugins"
import { Methods } from "../../tools/methods"

export interface SearchProperties<Item> extends React.PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
  idState: ID
  data: Array<Item>
  createItem: (props: CreateItemProperties<Item>) => React.ReactElement | string | null
  delay?: number
}

const customSearchProperties: Array<string | number | symbol> = ["idState", "data", "createItem", "delay"]

export interface CreateItemProperties<Item> {
  data: Item,
  input: string,
  setInput: React.Dispatch<React.SetStateAction<string>>
}

function Search<Item>(props: SearchProperties<Item>) {
  const [input, setInput] = useState("")
  const [focus, setFocus] = useState(false)
  const [, startTransition] = useTransition()
  const [data, setData] = useState<Array<React.ReactElement | string>>([])

  function inputHandler(event : ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTransition(() => setData(
        props.data
          .map(data => props.createItem({data, input, setInput})!)
          .filter(el => el !== null)
      ))
    }, props?.delay || 300)

    return () => clearTimeout(timeout)
  }, [input])

  return (
    <div {...Methods.filterObject(props, customSearchProperties)} className={`search ${focus ? "open" : ""} ${props?.className || ""}`.trim()}>
      <input type="text" className="search-input" placeholder={props.placeholder} value={input} onChange={inputHandler} onFocus={() => setFocus(true)}/>
      <ul className="search-dropdown">{data}</ul>
    </div>
  )
}

export default Search
