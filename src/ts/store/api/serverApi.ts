import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export interface ServerRequests {
  managers: string,
  clients: {
    id: string
    token: string
  },
  deposits: {
    id: string
    token: string
  }
}

export interface ServerResponse {
  managers: object,
  clients: object,
  deposits: object
}

export const serverApi = createApi({
  reducerPath: "server",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://26.95.106.24:8080/",
    prepareHeaders: headers => {
      headers.set("Content-type", "application/json")
      return headers
    }
  }),
  endpoints: build => ({
    getManagers: build.query<ServerResponse["managers"], ServerRequests["managers"]>({
      query: token => {
        console.log(token)

        return ({
          url: "api/v1/admin",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
      }
    }),
    getClients: build.query<ServerResponse["clients"], ServerRequests["clients"]>({
      query: props => ({
        url: `api/v1/clients/${props.id}`,
        headers: {
          "Authorization": `Bearer ${props.token}`
        }
      })
    }),
    getDeposits: build.query<ServerResponse["deposits"], ServerRequests["deposits"]>({
      query: props => ({
        url: `api/v1/deposits/${props.id}`,
        headers: {
          "Authorization": `Bearer ${props.token}`
        }
      })
    })
  })
})

export const { useGetManagersQuery, useGetClientsQuery, useGetDepositsQuery } = serverApi