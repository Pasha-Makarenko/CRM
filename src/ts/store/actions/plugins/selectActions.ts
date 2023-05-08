/* eslint-disable no-unused-vars */
import { AddProps, ID, SelectActions, SelectState } from "../../../models/plugins"
import { selectSlice } from "../../reducers/plugins/selectReducer"
import { AppDispatch } from "../../setupStore"
import { useAppDispatch } from "../../../react/hooks/redux.hook"

export const selectActions : (dispatch : AppDispatch | ReturnType<typeof useAppDispatch>) => SelectActions = dispatch => ({
  load(state: SelectState) {
    dispatch(selectSlice.actions.load(state))
  },
  add(props: AddProps) {
    dispatch(selectSlice.actions.add(props))
  },
  delete(id: ID) {
    dispatch(selectSlice.actions.delete(id))
  },
  open(id: ID) {
    dispatch(selectSlice.actions.open(id))
  },
  close(id: ID) {
    dispatch(selectSlice.actions.close(id))
  },
  select(state: SelectState) {
    dispatch(selectSlice.actions.select(state))
  }
})