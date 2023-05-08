/* eslint-disable no-unused-vars */
import { AppDispatch } from "../setupStore"
import { useAppDispatch } from "../../react/hooks/redux.hook"
import { userSlice, UserActions } from "../reducers/userReducer"

export const userActions: (dispatch : AppDispatch | ReturnType<typeof useAppDispatch>) => UserActions = dispatch => ({
  setState(state) {
    dispatch(userSlice.actions["setState"](state))
  },
  setToken(token) {
    dispatch(userSlice.actions["setToken"](token))
  }
})