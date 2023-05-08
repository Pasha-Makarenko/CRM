import React, { useEffect, useState } from "react"
import { authApi } from "../../store/api/authApi"
import { userActions } from "../../store/actions/userActions"
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook"

const Login: React.FC = () => {
  const [form, setForm] = useState<{username: string, password: string}>({username: "", password: ""})
  const [ login, { data, isLoading, error } ] = authApi.useLoginMutation()
  const userAction = userActions(useAppDispatch())
  const user = useAppSelector(state => state.userState)

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login(form)
  }

  useEffect(() => {
    if (!user.token) userAction.setState({ ...user, ...data })
  }, [data])

  return (
    <div className="login">
      <h1 className="login__title">Авторизация</h1>
      <form onSubmit={submitHandler} className="login__form form-profile">
        <label className="form-profile__label">
          <input
            type="text"
            name="text"
            className="form-profile__input"
            placeholder="Имя"
            value={form.username}
            onChange={event => setForm({...form, username: event.target.value})}
          />
        </label>
        <label className="form-profile__label">
          <input
            type="password"
            name="password"
            className="form-profile__input"
            placeholder="Пароль"
            value={form.password}
            onChange={event => setForm({...form, password: event.target.value})}
          />
        </label>
        <button
          type="submit"
          className="form-profile__btn"
        >{ isLoading ? "Loading..." : "Войти" }</button>
        { error && "Something went wrong" }
      </form>
    </div>
  )
}

export default Login
