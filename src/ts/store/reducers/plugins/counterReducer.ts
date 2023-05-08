import { CounterState, ID, IdAction } from "../../../models/plugins"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState : Array<CounterState> = []

export const counterSlice = createSlice({
  name: "counters",
  initialState,
  reducers: {
    load(state: Array<CounterState>, action: PayloadAction<CounterState>) {
      state[state.findIndex(counter => counter.id === action.payload.id)] = action.payload
    },
    add(state: Array<CounterState>, action: PayloadAction<CounterState>) {
      state.push({
        id: action.payload.id,
        value: action.payload.value,
        change: action.payload.change,
        limit: action.payload.limit,
        load: action.payload.load
      })
    },
    delete(state: Array<CounterState>, action: IdAction) {
      const index = state.findIndex(counter => counter.id === action.payload)
      if (index !== -1) state.splice(index, index)
      else throw new Error(`Counter with id: ${action.payload} is undefined`)
    },
    addValue(state: Array<CounterState>, action: IdAction) {
      const index = state.findIndex(counter => counter.id === action.payload)
      if (index !== -1) {
        const result = state[index].value + state[index].change.add
        state[index].value = result <= state[index].limit.max ? result : state[index].limit.max
      }
      else throw new Error(`Counter with id: ${action.payload} is undefined`)
    },
    subValue(state: Array<CounterState>, action: IdAction) {
      const index = state.findIndex(counter => counter.id === action.payload)
      if (index !== -1) {
        const result = state[index].value - state[index].change.sub
        state[index].value = result >= state[index].limit.min ? result : state[index].limit.min
      }
      else throw new Error(`Counter with id: ${action.payload} is undefined`)
    },
    setValue(state: Array<CounterState>, action: PayloadAction<{id: ID, value: number}>) {
      const index = state.findIndex(counter => counter.id === action.payload.id)
      if (index !== -1) state[index].value = action.payload.value < state[index].limit.min ? state[index].limit.min
        : action.payload.value > state[index].limit.max ? state[index].limit.max
        : action.payload.value
      else throw new Error(`Counter with id: ${action.payload.id} is undefined`)
    }
  }
})