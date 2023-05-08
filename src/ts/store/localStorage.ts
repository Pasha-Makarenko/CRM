/* eslint-disable no-unused-vars */
import { RootState } from "./setupStore"

export const loadState: () => RootState = () => {
  try {
    const state = localStorage.getItem("state")
    return state !== null ? JSON.parse(state) : {}
  } catch (e) {
    return {}
  }
}

export const saveState: (state : RootState) => void = state => {
  try {
    const passKeys: Array<string> = ["auth", "search", "server"]
    const filteredState: {
      [key: string | number | symbol]: Array<unknown> | object
    } = {}

    for (const key in state) {
      const value = state[key]

      if (passKeys.includes(key)) filteredState[key] = value
      else if (Array.isArray(value)) filteredState[key] = value.filter(el => el?.load)
      else filteredState[key] = value?.load ? value : null
    }

    localStorage.setItem("state", JSON.stringify(filteredState))
  } catch (e) {
    return
  }
}