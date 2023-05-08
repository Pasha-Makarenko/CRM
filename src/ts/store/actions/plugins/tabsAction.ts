/* eslint-disable no-unused-vars */
import { tabsSlice } from "../../reducers/plugins/tabsReducer"
import { AddProps, ID, TabsActions, TabsState } from "../../../models/plugins"
import { AppDispatch } from "../../setupStore"
import { useAppDispatch } from "../../../react/hooks/redux.hook"

export const tabsActions : (dispatch : AppDispatch | ReturnType<typeof useAppDispatch>) => TabsActions = dispatch => ({
  load(state: TabsState) {
    dispatch(tabsSlice.actions.load(state))
  },
  add(props: AddProps) {
    dispatch(tabsSlice.actions.add(props))
  },
  delete(id: ID) {
    dispatch(tabsSlice.actions.delete(id))
  },
  tab(state: TabsState) {
    dispatch(tabsSlice.actions.tab(state))
  }
})