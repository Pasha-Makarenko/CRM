/* eslint-disable no-unused-vars */
import { spoilerSlice } from "../../reducers/plugins/spoilerReducer"
import { AddProps, ID, SpoilerActions, SpoilerState } from "../../../models/plugins"
import { AppDispatch } from "../../setupStore"
import { useAppDispatch } from "../../../react/hooks/redux.hook"

export const spoilerActions : (dispatch : AppDispatch | ReturnType<typeof useAppDispatch>) => SpoilerActions = dispatch => ({
  load(state: SpoilerState) {
    dispatch(spoilerSlice.actions.load(state))
  },
  add(props: AddProps) {
    dispatch(spoilerSlice.actions.add(props))
  },
  delete(id: ID) {
    dispatch(spoilerSlice.actions.delete(id))
  },
  open(id: ID) {
    dispatch(spoilerSlice.actions.open(id))
  },
  close(id: ID) {
    dispatch(spoilerSlice.actions.close(id))
  }
})