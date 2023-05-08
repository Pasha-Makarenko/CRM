import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook"
import { useGetManagersQuery } from "../../store/api/serverApi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { modalActions } from "../../store/actions/plugins/modalActions"
import Modal, { ModalTarget } from "../plugins/Modal"
import { ManagerAddInput } from "../../models/forms"

const Managers: React.FC = () => {
  const user = useAppSelector(state => state.userState)
  if (user.role != "admin") return <React.Fragment/>

  const { data, isLoading, error } = useGetManagersQuery()
  const modal = modalActions(useAppDispatch())
  const [form, setForm] = useState<ManagerAddInput>({username: "", email: "", password: "", passwordConfirm: ""})

  const modalAdd = {
    cancel: () => {
      modal.close("manager-add")
    },
    add: () => {
      modal.close("manager-add")
    }
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (form.password == form.passwordConfirm) return
  }

  return (
    <React.Fragment>
      <Header active="managers"/>
      <main className="main main_managers">
        <div className="main__container">
          <section className="managers">
            <div className="managers__heading">
              <h1 className="managers__title">Менеджеры</h1>
              <Modal className="managers__add" idState={"manager-add"} isLoad={false}>
                <h1 className="managers__add__title">Добавить менеджера</h1>
                <form onSubmit={submitHandler} className="managers__add form-profile">
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
                      type="email"
                      name="email"
                      className="form-profile__input"
                      placeholder="Почта"
                      value={form.email}
                      onChange={event => setForm({...form, email: event.target.value})}
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
                  <label className="form-profile__label">
                    <input
                      type="password"
                      name="password-confirm"
                      className={`form-profile__input ${form.password != form.passwordConfirm && form.passwordConfirm ? "form-profile__input_error" : ""}`.trim()}
                      placeholder="Повторите пароль"
                      value={form.passwordConfirm}
                      onChange={event => setForm({...form, passwordConfirm: event.target.value})}
                    />
                  </label>
                  <ul className="modal-profile__list">
                    <li className="modal-profile__item">
                      <button
                        type="button"
                        className="modal-profile__button form-profile__btn button_violet"
                        onClick={modalAdd.cancel}
                      >Отменить</button>
                    </li>
                    <li className="modal-profile__item">
                      <button
                        type="button"
                        className="modal-profile__button form-profile__btn button"
                        onClick={modalAdd.add}
                      >Добавить</button>
                    </li>
                  </ul>
                </form>
              </Modal>
              <ModalTarget idState={"manager-add"} className="managers__add-target button_violet">
                <FontAwesomeIcon icon={faPlus}/>
              </ModalTarget>
            </div>
            <div className="managers__table table-managers">
              <table className="table-managers__table">
                <thead className="table-managers__head">
                <tr className="table-managers__row table-managers__row_header">
                  <th className="table-managers__item">Менеджер</th>
                  <th className="table-managers__item">Клиенты</th>
                  <th className="table-managers__item">Депозиты</th>
                </tr>
                </thead>
                <tbody className="table-managers__body">
                {
                  isLoading ?
                    "Loading..." :
                    error ?
                      "Something went wrong" :
                      data && data.map((manager, i) =>
                        <tr key={i} className="table-managers__row">
                          <td className="table-managers__item">
                            <Link to={"/managers/:manager"}>{manager.username}</Link>
                          </td>
                          <td className="table-managers__item link">
                            <Link to={"/managers/:manager/customers"}>Клиенты</Link>
                          </td>
                          <td className="table-managers__item link">
                            <Link to={"/managers/:manager/deposits"}>Депозиты</Link>
                          </td>
                        </tr>
                      )
                }
                {/*{*/}
                {/*  new Array(10).fill(null).map((_, i) => <tr key={i} className="table-managers__row">*/}
                {/*      <td className="table-managers__item">*/}
                {/*        <Link to={"/managers/:manager"}>Имя Фамилия</Link>*/}
                {/*      </td>*/}
                {/*      <td className="table-managers__item link">*/}
                {/*        <Link to={"/managers/:manager/customers"}>Клиенты</Link>*/}
                {/*      </td>*/}
                {/*      <td className="table-managers__item link">*/}
                {/*        <Link to={"/managers/:manager/deposits"}>Депозиты</Link>*/}
                {/*      </td>*/}
                {/*    </tr>*/}
                {/*  )*/}
                {/*}*/}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </React.Fragment>
  )
}

export default Managers
