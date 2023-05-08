/* eslint-disable no-unused-vars */
import { AppDispatch } from "../../setupStore"
import { useAppDispatch } from "../../../react/hooks/redux.hook"
import { CounterActions, CounterState, ID } from "../../../models/plugins"
import { counterSlice } from "../../reducers/plugins/counterReducer"

export const counterActions : (dispatch : AppDispatch | ReturnType<typeof useAppDispatch>) => CounterActions = dispatch => ({
  load(state: CounterState) {
    dispatch(counterSlice.actions.load(state))
  },
  add(state: CounterState) {
    dispatch(counterSlice.actions.add(state))
  },
  delete(id: ID) {
    dispatch(counterSlice.actions.delete(id))
  },
  addValue(id: ID) {
    dispatch(counterSlice.actions.addValue(id))
  },
  subValue(id: ID) {
    dispatch(counterSlice.actions.subValue(id))
  },
  setValue({id, value}) {
    dispatch(counterSlice.actions.setValue({id, value}))
  }
})