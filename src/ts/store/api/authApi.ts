/* eslint-disable no-empty */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export interface AuthRequest {
  username: string
  password: string
}

export interface AuthResponse {
  username: string
  token: string
}

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://26.95.106.24:8080/"
  }),
  endpoints: build => ({
    register: build.mutation<AuthResponse, AuthRequest>({
      query: data => ({
        url: "api/v1/auth/register",
        method: "POST",
        body: data
      })
    }),
    login: build.mutation<AuthResponse, AuthRequest>({
      query: data => ({
        url: "api/v1/auth/login",
        method: "POST",
        body: data
      })
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST"
      })
    })
  })
})