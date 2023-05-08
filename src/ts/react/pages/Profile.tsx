import React, { useState } from "react"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import Modal, { ModalTarget } from "../plugins/Modal"
import { modalActions } from "../../store/actions/plugins/modalActions"
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook"
import { ProfileEditInput } from "../../models/forms"

const Profile: React.FC = () => {
  const user = useAppSelector(state => state.userState)
  const modal = modalActions(useAppDispatch())
  const [form, setForm] = useState<ProfileEditInput>({username: "", email: "", password: "", passwordConfirm: ""})

  const modalEdit = {
    cancel: () => {
      modal.close("modal-profile")
    },
    save: () => {
      modal.close("modal-profile")
    }
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (form.password == form.passwordConfirm) return
  }

  return (
    <React.Fragment>
      <Header/>
      <main className="main main_profile">
        <div className="main__container">
          <section className="profile">
            <h1 className="profile__title">Профиль</h1>
            <div className="profile__info">
              <div className="profile__image profile-image"></div>
              <div className="profile__text">
                <div className="profile__text-item profile__name">{ user.username }</div>
                <div className="profile__text-item profile__role">{ user.role == "admin" ? "Администратор" : "Менеджер" }</div>
                <Link className="profile__text-item profile__link link" to={"/customers"}>Клиенты</Link>
                {
                  user.role == "admin" ?
                    <Link className="profile__text-item profile__link link" to={"/managers"}>Менеджеры</Link> :
                    <Link className="profile__text-item profile__link link" to={"/deposits"}>Депозиты</Link>
                }
              </div>
            </div>
            <div className="profile__edit">
              <Modal className="modal-profile" idState={"modal-profile"} isLoad={false}>
                <h1 className="modal-profile__title">Редактировать профиль</h1>
                <form onSubmit={submitHandler} className="modal-profile__form form-profile">
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
                        onClick={modalEdit.cancel}
                      >Отменить</button>
                    </li>
                    <li className="modal-profile__item">
                      <button
                        type="button"
                        className="modal-profile__button form-profile__btn button"
                        onClick={modalEdit.save}
                      >Сохранить</button>
                    </li>
                  </ul>
                </form>
              </Modal>
              <ModalTarget className="modal-profile-target link" idState={"modal-profile"}>Редактировать профиль</ModalTarget>
            </div>
          </section>
        </div>
      </main>
    </React.Fragment>
  )
}

export default Profile
