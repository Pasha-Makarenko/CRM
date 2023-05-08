import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons"
import Header from "../components/Header"
import Modal, { ModalTarget } from "../plugins/Modal"
import { modalActions } from "../../store/actions/plugins/modalActions"
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook"
import { useGetClientsQuery } from "../../store/api/serverApi"

interface CustomersProperties {
  all?: boolean
}

const Customers: React.FC<CustomersProperties> = props => {
  const user = useAppSelector(state => state.userState)
  const modal = modalActions(useAppDispatch())
  const params = props.all ? null : useParams()
  const { data } = useGetClientsQuery(user.token || "")

  const modalDelete = {
    cancel: (i: number) => {
      modal.close(`customer-delete-modal-${i}`)
    },
    accept: (i: number) => {
      modal.close(`customer-delete-modal-${i}`)
    }
  }

  const modalAdd = {
    cancel: () => {
      modal.close("customer-add")
    },
    add: () => {
      modal.close("customer-add")
    }
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <React.Fragment>
      <Header active="customers"/>
      <main className="main main_customers">
        <div className="main__container">
          <section className="customers">
            <div className="customers__heading">
              <h1 className="customers__title">Клиенты</h1>
              <Modal className="customers__add" idState={"customer-add"} isLoad={false}>
                <h1 className="customers__add__title">Добавить менеджера</h1>
                <form className="customers__add form-profile">
                {/*<form onSubmit={submitHandler} className="customers__add form-profile">*/}
                  {/*<label className="form-profile__label">*/}
                  {/*  <input*/}
                  {/*    type="text"*/}
                  {/*    name="text"*/}
                  {/*    className="form-profile__input"*/}
                  {/*    placeholder="Имя"*/}
                  {/*    value={form.username}*/}
                  {/*    onChange={event => setForm({...form, username: event.target.value})}*/}
                  {/*  />*/}
                  {/*</label>*/}
                  {/*<label className="form-profile__label">*/}
                  {/*  <input*/}
                  {/*    type="email"*/}
                  {/*    name="email"*/}
                  {/*    className="form-profile__input"*/}
                  {/*    placeholder="Почта"*/}
                  {/*    value={form.email}*/}
                  {/*    onChange={event => setForm({...form, email: event.target.value})}*/}
                  {/*  />*/}
                  {/*</label>*/}
                  {/*<label className="form-profile__label">*/}
                  {/*  <input*/}
                  {/*    type="password"*/}
                  {/*    name="password"*/}
                  {/*    className="form-profile__input"*/}
                  {/*    placeholder="Пароль"*/}
                  {/*    value={form.password}*/}
                  {/*    onChange={event => setForm({...form, password: event.target.value})}*/}
                  {/*  />*/}
                  {/*</label>*/}
                  {/*<label className="form-profile__label">*/}
                  {/*  <input*/}
                  {/*    type="password"*/}
                  {/*    name="password-confirm"*/}
                  {/*    className={`form-profile__input ${form.password != form.passwordConfirm && form.passwordConfirm ? "form-profile__input_error" : ""}`.trim()}*/}
                  {/*    placeholder="Повторите пароль"*/}
                  {/*    value={form.passwordConfirm}*/}
                  {/*    onChange={event => setForm({...form, passwordConfirm: event.target.value})}*/}
                  {/*  />*/}
                  {/*</label>*/}
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
                      >Создать</button>
                    </li>
                  </ul>
                </form>
              </Modal>
              <ModalTarget idState={"customer-add"} type="button" className="customers__add-target button_violet">
                <FontAwesomeIcon icon={faPlus}/>
              </ModalTarget>
            </div>
            <div className="customers__table table-customers">
              <table className="table-customers__table">
                <thead className="table-customers__head">
                  <tr className="table-customers__row table-customers__row_header">
                    <th className="table-customers__item">Источник</th>
                    <th className="table-customers__item table-customers__item_owner">Менеджер</th>
                    <th className="table-customers__item">Контакты</th>
                    <th className="table-customers__item table-customers__item_stage">Стадия</th>
                    <th className="table-customers__item table-customers__item_delete"></th>
                  </tr>
                </thead>
                <tbody className="table-customers__body">
                  {
                    new Array(10).fill(null).map((_, i) => {
                        const random = Math.round(Math.random() * 10000)
                        const type = random <= 3300 ? "new" : random >= 6700 ? "closed" : "processed"

                        return <tr key={i} className="table-customers__row">
                          <td className="table-customers__item">{i + 1} источник</td>
                          <td className="table-customers__item table-customers__item_owner">
                            <Link to={"/managers/:manager"}>
                              Имя
                            </Link>
                          </td>
                          <td className="table-customers__item">
                            <Link to={
                              user.role == "admin" ? `/managers/:manager/customers/:customer` : "/customers/:customer"
                            }>
                              Имя
                            </Link>
                          </td>
                          <td className={`table-customers__item table-customers__item_stage table-customers__item_stage-${type}`}><span>{
                            type == "new" ?
                              "новый" :
                              type == "processed" ?
                                "в процесе" :
                                "закрытый"
                          }</span></td>
                          <td className="table-customers__item table-customers__item_delete">
                            <Modal
                              className="customer-delete"
                              idState={`customer-delete-modal-${i}`}
                              isLoad={false}
                            >
                              <h1 className="customer-delete__title">Вы точно хотите удалить этого клиента?</h1>
                              <ul className="customer-delete__list">
                                <li className="customer-delete__item">
                                  <button
                                    type="button"
                                    className="customer-delete__button button_violet"
                                    onClick={() => modalDelete.cancel(i)}
                                  >Нет</button>
                                </li>
                                <li className="customer-delete__item">
                                  <button
                                    type="button"
                                    className="customer-delete__button button"
                                    onClick={() => modalDelete.accept(i)}
                                  >Да</button>
                                </li>
                              </ul>
                            </Modal>
                            <ModalTarget className="customer-delete-target" idState={`customer-delete-modal-${i}`}>
                              <FontAwesomeIcon icon={faTrash}/>
                            </ModalTarget>
                          </td>
                        </tr>
                      }
                    )
                  }
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </React.Fragment>
  )
}

export default Customers
