import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddAction, IdAction, ModalState } from "../../../models/plugins"

const initialState : Array<ModalState> = []

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    load(state: Array<ModalState>, action: PayloadAction<ModalState>) {
      state[state.findIndex(modal => modal.id === action.payload.id)] = action.payload
    },
    add(state: Array<ModalState>, action: AddAction) {
      state.push({
        id: action.payload.id,
        open: false,
        load: action.payload.load
      })
    },
    delete(state: Array<ModalState>, action: IdAction) {
      const index = state.findIndex(modal => modal.id === action.payload)
      if (index !== -1) state.splice(index, index)
      else throw new Error(`Modal with id: ${action.payload} is undefined`)
    },
    open(state: Array<ModalState>, action: IdAction) {
      const index = state.findIndex(modal => modal.id === action.payload)
      if (index !== -1) state[index].open = true
      else throw new Error(`Modal with id: ${action.payload} is undefined`)
    },
    close(state: Array<ModalState>, action: IdAction) {
      const index = state.findIndex(modal => modal.id === action.payload)
      if (index !== -1) state[index].open = false
      else throw new Error(`Modal with id: ${action.payload} is undefined`)
    }
  }
})