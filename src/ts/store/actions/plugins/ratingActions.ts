/* eslint-disable no-unused-vars */
import { AddProps, ID, RatingActions, RatingState } from "../../../models/plugins"
import { ratingSlice } from "../../reducers/plugins/ratingReducer"
import { AppDispatch } from "../../setupStore"
import { useAppDispatch } from "../../../react/hooks/redux.hook"

export const ratingActions : (dispatch : AppDispatch | ReturnType<typeof useAppDispatch>) => RatingActions = dispatch => ({
  load(state: RatingState): void {
    dispatch(ratingSlice.actions.load(state))
  },
  add(props: AddProps): void {
    dispatch(ratingSlice.actions.add(props))
  },
  delete(id: ID): void {
    dispatch(ratingSlice.actions.delete(id))
  },
  grade(state: RatingState): void {
    dispatch(ratingSlice.actions.grade(state))
  }
})
