import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddAction, IdAction, TabsState } from "../../../models/plugins"

const initialState : Array<TabsState> = []

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    load(state: Array<TabsState>, action: PayloadAction<TabsState>) {
      state[state.findIndex(tabs => tabs.id === action.payload.id)] = action.payload
    },
    add(state: Array<TabsState>, action: AddAction) {
      state.push({
        id: action.payload.id,
        tab: 0,
        load: action.payload.load
      })
    },
    delete(state: Array<TabsState>, action: IdAction) {
      const index = state.findIndex(tabs => tabs.id === action.payload)
      if (index !== -1) state.splice(index, index)
      else throw new Error(`Tabs with id: ${action.payload} is undefined`)
    },
    tab(state: Array<TabsState>, action: PayloadAction<TabsState>) {
      const index = state.findIndex(tabs => tabs.id === action.payload.id)
      if (index !== -1) state[index].tab = action.payload.tab
      else throw new Error(`Tabs with id: ${action.payload} is undefined`)
    }
  }
})