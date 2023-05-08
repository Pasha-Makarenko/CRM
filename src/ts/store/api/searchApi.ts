import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export const searchApi = createApi({
  reducerPath: "search",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/"
  }),
  endpoints: build => ({
    searchData: build.query<unknown, string>({
      query: (q) => ({
        url: q
      })
    })
  })
})