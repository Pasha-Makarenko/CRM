/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Provider } from "react-redux"
import { AppStore } from "../store/setupStore"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Customers from "./pages/Customers"
import Customer from "./pages/Customer"
import Managers from "./pages/Managers"
import Manager from "./pages/Manager"
import { useAppSelector } from "./hooks/redux.hook"
import Deposits from "./pages/Deposits"
import AllCustomers from "./pages/AllCustomers"

const App: React.FC = () => {
  const user = useAppSelector(state => state.userState)

  return (
    <React.Fragment>{
      user.token ?
        <Routes>
          <Route path="/login" element={<Navigate to={"/"} replace={true}/>}/>
          <Route path="/profile" exact={true} element={<Profile/>}/>
          {
            user.role == "admin" ?
              <React.Fragment>
                <Route path="/" element={<Navigate to={"/managers"} replace={true}/>}/>
                <Route path="/managers" exact={true} element={<Managers/>}/>
                <Route path="/managers/:manager" exact={true} element={<Manager/>}/>
                <Route path="/managers/:manager/customers" exact={true} element={<Customers/>}/>
                <Route path="/managers/:manager/customers/:customer" exact={true} element={<Customer/>}/>
                <Route path="/managers/:manager/deposits" exact={true} element={<Deposits/>}/>
                <Route path="/customers" exact={true} element={<AllCustomers/>}/>
              </React.Fragment> :
              <React.Fragment>
                <Route path="/" element={<Navigate to={"/customers"} replace={true}/>}/>
                <Route path="/customers" exact={true} element={<Customers/>}/>
                <Route path="/customers/:customer" exact={true} element={<Customer/>}/>
                <Route path="/deposits" exact={true} element={<Deposits/>}/>
              </React.Fragment>
          }
        </Routes> :
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} replace={true}/>}/>
          <Route path="/login" exact={true} element={<Login/>}/>
        </Routes>
    }</React.Fragment>
  )
}

const root = createRoot(document.getElementById("root") as HTMLElement)

export const render = (params: { store: AppStore }) => {
  root.render(
    <Provider store={params.store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  )
}