import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddAction, IdAction, SelectState } from "../../../models/plugins"

const initialState : Array<SelectState> = []

export const selectSlice = createSlice({
  name: "selects",
  initialState,
  reducers: {
    load(state: Array<SelectState>, action: PayloadAction<SelectState>) {
      state[state.findIndex(select => select.id === action.payload.id)] = action.payload
    },
    add(state: Array<SelectState>, action: AddAction) {
      state.push({
        id: action.payload.id,
        open: false,
        selected: {
          id: -1,
          value: null
        },
        load: action.payload.load
      })
    },
    delete(state: Array<SelectState>, action: IdAction) {
      const index = state.findIndex(select => select.id === action.payload)
      if (index !== -1) state.splice(index, index)
      else throw new Error(`Select with id: ${action.payload} is undefined`)
    },
    open(state: Array<SelectState>, action: IdAction) {
      const index = state.findIndex(select => select.id === action.payload)
      if (index !== -1) state[index].open = true
      else throw new Error(`Select with id: ${action.payload} is undefined`)
    },
    close(state: Array<SelectState>, action: IdAction) {
      const index = state.findIndex(select => select.id === action.payload)
      if (index !== -1) state[index].open = false
      else throw new Error(`Select with id: ${action.payload} is undefined`)
    },
    select(state: Array<SelectState>, action: PayloadAction<SelectState>) {
      const index = state.findIndex(select => select.id === action.payload.id)
      if (index !== -1) state[index].selected = action.payload.selected
      else throw new Error(`Select with id: ${action.payload} is undefined`)
    }
  }
})