import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddAction, IdAction, RatingState } from "../../../models/plugins"

const initialState : Array<RatingState> = []

export const ratingSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    load(state: Array<RatingState>, action: PayloadAction<RatingState>) {
      state[state.findIndex(tabs => tabs.id === action.payload.id)] = action.payload
    },
    add(state: Array<RatingState>, action: AddAction) {
      state.push({
        id: action.payload.id,
        graded: -1,
        load: action.payload.load
      })
    },
    delete(state: Array<RatingState>, action: IdAction) {
      const index = state.findIndex(tabs => tabs.id === action.payload)
      if (index !== -1) state.splice(index, index)
      else throw new Error(`Rating with id: ${action.payload} is undefined`)
    },
    grade(state: Array<RatingState>, action: PayloadAction<RatingState>) {
      const index = state.findIndex(tabs => tabs.id === action.payload.id)
      if (index !== -1) state[index].graded = action.payload.graded
      else throw new Error(`Rating with id: ${action.payload} is undefined`)
    }
  }
})