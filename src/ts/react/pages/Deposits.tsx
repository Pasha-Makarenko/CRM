import React, { useEffect } from "react"
import Header from "../components/Header"
import { useAppSelector } from "../hooks/redux.hook"
import { useGetDepositsQuery } from "../../store/api/serverApi"

const Deposits: React.FC = () => {
  const user = useAppSelector(state => state.userState)
  const { data } = useGetDepositsQuery(user.token || "")

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <React.Fragment>
      <Header active="deposits"/>
      <main className="main main_deposits">
        <div className="main__container">
          <section className="deposits">
            <h1 className="deposits__title">Депозиты</h1>
            <ul className="deposits__list">
              {
                new Array(10).fill(null).map((_, i) => <li className="deposits__item deposit" key={i}>
                  <div className="deposit__sum">1000</div>
                  <div className="deposit__date">Дата</div>
                </li>)
              }
            </ul>
          </section>
        </div>
      </main>
    </React.Fragment>
  )
}

export default Deposits
