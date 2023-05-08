import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { store } from "../../index"

export interface ServerRequests {
  managers: void,
  clients: {
    id: string
  },
  deposits: {
    id: string
  }
}

export interface Manager {
  username: string
  email: string
  clients: Array<Client>
  deposits: Array<Deposit>
}
export interface Client {
  name: string
  phoneNumber: string
  status: string
  created: string
  clientComments: Array<string> | null
}

export interface Deposit {
  sum: number,
  created: string
}

export interface ServerResponse {
  managers: Array<Manager>,
  clients: Array<Client>,
  deposits: Array<Deposit>
}

export const serverApi = createApi({
  reducerPath: "server",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://26.95.106.24:8080/",
    credentials: "same-origin",
    mode: "no-cors",
    prepareHeaders: headers => {
      const token = store.getState().userState.token

      headers.set("Accept", "application/json")
      headers.set("Authorization", `Bearer ${token}`)
      headers.set("Content-type", "application/json")
      return headers
    }
  }),
  endpoints: build => ({
    getManagers: build.query<ServerResponse["managers"], ServerRequests["managers"]>({
      query: () => ({
        url: "api/v1/admin"
      })
    }),
    getClients: build.query<ServerResponse["clients"], ServerRequests["clients"]>({
      query: props => ({
        url: `api/v1/clients/${props.id}`
      })
    }),
    getDeposits: build.query<ServerResponse["deposits"], ServerRequests["deposits"]>({
      query: props => {
        console.log(props)

        return ({
          url: `api/v1/deposits/${props.id}`
        })
      }
    })
  })
})

export const { useGetManagersQuery, useGetClientsQuery, useGetDepositsQuery } = serverApi