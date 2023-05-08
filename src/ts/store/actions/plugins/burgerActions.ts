/* eslint-disable no-unused-vars */
import { AddProps, BurgerActions, BurgerState, ID } from "../../../models/plugins"
import { AppDispatch } from "../../setupStore"
import { useAppDispatch } from "../../../react/hooks/redux.hook"
import { burgerSlice } from "../../reducers/plugins/burgerReducer"

export const burgerActions : (dispatch : AppDispatch | ReturnType<typeof useAppDispatch>) => BurgerActions = dispatch => ({
  load(state: BurgerState) {
    dispatch(burgerSlice.actions.load(state))
  },
  add(props: AddProps) {
    dispatch(burgerSlice.actions.add(props))
  },
  delete(id: ID) {
    dispatch(burgerSlice.actions.delete(id))
  },
  open(id: ID) {
    dispatch(burgerSlice.actions.open(id))
  },
  close(id: ID) {
    dispatch(burgerSlice.actions.close(id))
  }
})