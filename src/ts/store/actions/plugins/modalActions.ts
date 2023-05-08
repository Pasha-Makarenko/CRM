/* eslint-disable no-unused-vars */
import { AppDispatch } from "../../setupStore"
import { useAppDispatch } from "../../../react/hooks/redux.hook"
import { AddProps, ID, ModalActions, ModalState } from "../../../models/plugins"
import { modalSlice } from "../../reducers/plugins/modalReducer"

export const modalActions : (dispatch : AppDispatch | ReturnType<typeof useAppDispatch>) => ModalActions = dispatch => ({
  load(state: ModalState) {
    dispatch(modalSlice.actions.load(state))
  },
  add(props: AddProps) {
    dispatch(modalSlice.actions.add(props))
  },
  delete(id: ID) {
    dispatch(modalSlice.actions.delete(id))
  },
  open(id: ID) {
    dispatch(modalSlice.actions.open(id))
  },
  close(id: ID) {
    dispatch(modalSlice.actions.close(id))
  }
})