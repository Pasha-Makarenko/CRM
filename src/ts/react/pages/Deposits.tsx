import React, { useEffect } from "react"
import Header from "../components/Header"
import { useGetDepositsQuery } from "../../store/api/serverApi"
import { useParams } from "react-router-dom"

const Deposits: React.FC = () => {
  const params = useParams<{ manager: string }>()
  const { data, isLoading, error } = useGetDepositsQuery({
    id: params.manager || ""
  })

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
                isLoading ?
                  "Loading..." :
                  error ?
                    "Something went wrong" :
                    data && data.map((deposit, i) => <li className="deposits__item deposit" key={i}>
                      <div className="deposit__sum">{deposit.sum}</div>
                      <div className="deposit__date">{deposit.created}</div>
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
