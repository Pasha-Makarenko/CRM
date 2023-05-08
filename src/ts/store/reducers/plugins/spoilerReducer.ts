/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddAction, IdAction, SpoilerState } from "../../../models/plugins"

const initialState : Array<SpoilerState> = []

export const spoilerSlice = createSlice({
  name: "spoilers",
  initialState,
  reducers: {
    load(state: Array<SpoilerState>, action: PayloadAction<SpoilerState>) {
      state[state.findIndex(spoiler => spoiler.id === action.payload.id)] = action.payload
    },
    add(state: Array<SpoilerState>, action: AddAction) {
      state.push({
        id: action.payload.id,
        open: false,
        load: action.payload.load
      })
    },
    delete(state: Array<SpoilerState>, action: IdAction) {
      const index = state.findIndex(spoiler => spoiler.id === action.payload)
      if (index !== -1) state.splice(index, index)
      else throw new Error(`Spoiler with id: ${action.payload} is undefined`)
    },
    open(state: Array<SpoilerState>, action: IdAction) {
      const index = state.findIndex(spoiler => spoiler.id === action.payload)
      if (index !== -1) state[index].open = true
      else throw new Error(`Spoiler with id: ${action.payload} is undefined`)
    },
    close(state: Array<SpoilerState>, action: IdAction) {
      const index = state.findIndex(spoiler => spoiler.id === action.payload)
      if (index !== -1) state[index].open = false
      else throw new Error(`Spoiler with id: ${action.payload} is undefined`)
    }
  }
})