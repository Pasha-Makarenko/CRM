import React from "react"
import Header from "../components/Header"
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook"
import Modal, { ModalTarget } from "../plugins/Modal"
import { modalActions } from "../../store/actions/plugins/modalActions"
import Select, { SelectContent, SelectInput, SelectItem } from "../plugins/Select"

const Customer: React.FC = () => {
  const user = useAppSelector(state => state.userState)
  const modal = modalActions(useAppDispatch())

  const modalStage = {
    cancel: () => {
      modal.close("customer-stage")
    },
    save: () => {
      modal.close("customer-stage")
    }
  }

  return (
    <React.Fragment>
      <Header/>
      <main className="main main_customer">
        <div className="main__container">
          <section className="customer">
            <h1 className="customer__title">Клиент</h1>
            <div className="customer__info">
              <div className="customer__image profile-image"></div>
              <div className="customer__text">
                <div className="customer__text-item customer__name">Имя Фамилия</div>
                <div className="customer__text-item customer__phone">Номер телефона</div>
                <div className="customer__text-item customer__stage customer__stage-new">
                  <span>Новый</span>
                  <Modal className="customer__stage-choose choose-stage" idState={"customer-stage"} isLoad={false}>
                    <h1 className="choose-stage__title">Изменение статуса клиента</h1>
                    {
                      user.role == "admin" ?
                        <Select className="choose-stage__spoiler spoiler-stage" idState="choose-stage" isLoad={false}>
                          <SelectInput className="spoiler-stage__input">Выбрать</SelectInput>
                          <SelectContent className="spoiler-stage__content">
                            <SelectItem className="spoiler-stage__item" idItem={"new"}>
                              <div className="customer__stage customer__stage-new">
                                <span>новый</span>
                              </div>
                            </SelectItem>
                            <SelectItem className="spoiler-stage__item" idItem={"processed"}>
                              <div className="customer__stage customer__stage-processed">
                                <span>новый</span>
                              </div>
                            </SelectItem>
                            <SelectItem className="spoiler-stage__item" idItem={"closed"}>
                              <div className="customer__stage customer__stage-closed">
                                <span>новый</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select> :
                        <div className="choose-stage__content">
                          Изменить на:
                          <div className="customer__stage customer__stage-processed">
                            <span>в процесе</span>
                          </div>
                        </div>
                    }
                    <ul className="choose-stage__list">
                      <li className="choose-stage__item">
                        <button
                          type="button"
                          className="choose-stage__button button_violet"
                          onClick={modalStage.cancel}
                        >Отменить</button>
                      </li>
                      <li className="choose-stage__item">
                        <button
                          type="button"
                          className="choose-stage__button button"
                          onClick={modalStage.save}
                        >Сохранить</button>
                      </li>
                    </ul>
                  </Modal>
                  <ModalTarget className="customer__stage-choose-target" idState={"customer-stage"}>
                    Изменить
                  </ModalTarget>
                </div>
              </div>
            </div>
            <ul className="customer__comments">
              {
                new Array(10).fill(null).map((_, i) =>
                  <li key={i} className="customer__comment comment-customer">
                    <div className="comment-customer__date">Дата</div>
                    <div className="comment-customer__content">Комментарий</div>
                  </li>
                )
              }
            </ul>
          </section>
        </div>
      </main>
    </React.Fragment>
  )
}

export default Customer
