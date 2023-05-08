import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddAction, BurgerState, IdAction } from "../../../models/plugins"

const initialState : Array<BurgerState> = []

export const burgerSlice = createSlice({
  name: "burgers",
  initialState,
  reducers: {
    load(state: Array<BurgerState>, action: PayloadAction<BurgerState>) {
      state[state.findIndex(burger => burger.id === action.payload.id)] = action.payload
    },
    add(state: Array<BurgerState>, action: AddAction) {
      state.push({
        id: action.payload.id,
        open: false,
        load: action.payload.load
      })
    },
    delete(state: Array<BurgerState>, action: IdAction) {
      const index = state.findIndex(burger => burger.id === action.payload)
      if (index !== -1) state.splice(index, index)
      else throw new Error(`Burger with id: ${action.payload} is undefined`)
    },
    open(state: Array<BurgerState>, action: IdAction) {
      const index = state.findIndex(burger => burger.id === action.payload)
      if (index !== -1) state[index].open = true
      else throw new Error(`Burger with id: ${action.payload} is undefined`)
    },
    close(state: Array<BurgerState>, action: IdAction) {
      const index = state.findIndex(burger => burger.id === action.payload)
      if (index !== -1) state[index].open = false
      else throw new Error(`Burger with id: ${action.payload} is undefined`)
    }
  }
})