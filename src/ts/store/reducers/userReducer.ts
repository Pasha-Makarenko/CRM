/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Token = string | null

export interface UserState {
  username: string
  role: "admin" | "manager"
  token: Token
  load: true
}

export interface UserActions {
  setState(state: UserState | null): void
  setToken(token: Token): void
}

const initialState: UserState = {
  username: "Admin",
  role: "admin",
  token: null,
  load: true
}

export const userSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setState(state: UserState, action: PayloadAction<UserState | null>) {
      return { ...action.payload }
    },
    setToken(state: UserState, action: PayloadAction<Token>) {
      state.token = action.payload
    }
  }
})