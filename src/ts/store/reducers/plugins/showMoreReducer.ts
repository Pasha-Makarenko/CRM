import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddAction, IdAction, ShowMoreState } from "../../../models/plugins"

const initialState : Array<ShowMoreState> = []

export const showMoreSlice = createSlice({
  name: "showMores",
  initialState,
  reducers: {
    load(state: Array<ShowMoreState>, action: PayloadAction<ShowMoreState>) {
      state[state.findIndex(showMore => showMore.id === action.payload.id)] = action.payload
    },
    add(state: Array<ShowMoreState>, action: AddAction) {
      state.push({
        id: action.payload.id,
        open: false,
        load: action.payload.load
      })
    },
    delete(state: Array<ShowMoreState>, action: IdAction) {
      const index = state.findIndex(showMore => showMore.id === action.payload)
      if (index !== -1) state.splice(index, index)
      else throw new Error(`ShowMore with id: ${action.payload} is undefined`)
    },
    open(state: Array<ShowMoreState>, action: IdAction) {
      const index = state.findIndex(showMore => showMore.id === action.payload)
      if (index !== -1) state[index].open = true
      else throw new Error(`ShowMore with id: ${action.payload} is undefined`)
    },
    close(state: Array<ShowMoreState>, action: IdAction) {
      const index = state.findIndex(showMore => showMore.id === action.payload)
      if (index !== -1) state[index].open = false
      else throw new Error(`ShowMore with id: ${action.payload} is undefined`)
    }
  }
})