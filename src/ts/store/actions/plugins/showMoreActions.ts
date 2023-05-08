/* eslint-disable no-unused-vars */
import { showMoreSlice } from "../../reducers/plugins/showMoreReducer"
import { AddProps, ID, ShowMoreActions, ShowMoreState } from "../../../models/plugins"
import { AppDispatch } from "../../setupStore"
import { useAppDispatch } from "../../../react/hooks/redux.hook"

export const showMoreActions : (dispatch : AppDispatch | ReturnType<typeof useAppDispatch>) => ShowMoreActions = dispatch => ({
  load(state: ShowMoreState) {
    dispatch(showMoreSlice.actions.load(state))
  },
  add(props: AddProps) {
    dispatch(showMoreSlice.actions.add(props))
  },
  delete(id: ID) {
    dispatch(showMoreSlice.actions.delete(id))
  },
  open(id: ID) {
    dispatch(showMoreSlice.actions.open(id))
  },
  close(id: ID) {
    dispatch(showMoreSlice.actions.close(id))
  }
})