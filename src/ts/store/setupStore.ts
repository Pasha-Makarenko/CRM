import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { loadState } from "./localStorage"
import { spoilerSlice } from "./reducers/plugins/spoilerReducer"
import { tabsSlice } from "./reducers/plugins/tabsReducer"
import { selectSlice } from "./reducers/plugins/selectReducer"
import { showMoreSlice } from "./reducers/plugins/showMoreReducer"
import { ratingSlice } from "./reducers/plugins/ratingReducer"
import { modalSlice } from "./reducers/plugins/modalReducer"
import { counterSlice } from "./reducers/plugins/counterReducer"
import { burgerSlice } from "./reducers/plugins/burgerReducer"
import { authApi } from "./api/authApi"
import { searchApi } from "./api/searchApi"
import { userSlice } from "./reducers/userReducer"
import { serverApi } from "./api/serverApi"

const rootReducer = combineReducers({
  spoilers: spoilerSlice.reducer,
  tabs: tabsSlice.reducer,
  selects: selectSlice.reducer,
  showMores: showMoreSlice.reducer,
  ratings: ratingSlice.reducer,
  modals: modalSlice.reducer,
  counters: counterSlice.reducer,
  burgers: burgerSlice.reducer,
  userState: userSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [serverApi.reducerPath]: serverApi.reducer
})

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env["NODE_ENV"] !== "production",
    preloadedState: loadState(),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(searchApi.middleware, authApi.middleware, serverApi.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]