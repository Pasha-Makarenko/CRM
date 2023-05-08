/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faBars, faXmark, faUserGear, faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { NavLink } from "react-router-dom"
import Burger, { BurgerTarget } from "../plugins/Burger"
import { useAppSelector } from "../hooks/redux.hook"

interface HeaderProperties {
  active?: "customers" | "managers" | "deposits"
}

const Header: React.FC<HeaderProperties> = props => {
  const user = useAppSelector(state => state.userState)
  const burger = useAppSelector(state => state.burgers.find(b => b.id == "header-menu"))
  const mediaQuery = window.matchMedia(`(max-width: 767.9px)`)
  const [matches, setMatches] = useState(mediaQuery.matches)
  const [containerWidth, setContainerWidth] = useState(0)
  const [resize, setResize] = useState(0)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mediaQuery.addEventListener("change", mediaQueryHandler)

    window.addEventListener("resize", resizeHandler)
    resizeHandler()

    return () => {
      mediaQuery.removeEventListener("change", mediaQueryHandler)
      window.removeEventListener("resize", resizeHandler)
    }
  }, [])

  useEffect(() => {
    burger?.open ?
      document.body.classList.add("locked") :
      document.body.classList.remove("locked")
  }, [burger])

  const mediaQueryHandler = (event: MediaQueryListEvent) => {
    setMatches(event.matches)
  }

  const resizeHandler = () => {
    setResize(window.innerWidth)
  }

  useEffect(() => {
    if (!container.current || matches) return

    setContainerWidth(container.current.offsetWidth)
  }, [resize, matches])

  return (
    <header style={{minWidth: matches ? "100%" : containerWidth}} className="header">
      <div ref={container} className="header__container">
        <h1 className="header__title">
          <span>
            <FontAwesomeIcon icon={faGear}/>
          </span>
          { !matches ? <span>CRM</span> : null }
        </h1>
        {
          matches ?
            <React.Fragment>
              <Burger className="header__burger burger-header" idState="header-menu" isLoad={false}>
                <nav className="burger-header__nav nav-header">
                  <ul className="nav-header__list">
                    <li className={`nav-header__item ${props.active == "customers" ? "button_violet" : "button" }`.trim()}>
                      <NavLink className="nav-header__link" to={"/customers"}>
                        <FontAwesomeIcon icon={faUser}/>Клиенты
                      </NavLink>
                    </li>
                    {
                      user.role == "admin" ?
                        <li className={`nav-header__item ${props.active == "managers" ? "button_violet" : "button" }`.trim()}>
                          <NavLink className="nav-header__link" to={"/managers"}>
                            <FontAwesomeIcon icon={faUserGear}/>Менеджеры
                          </NavLink>
                        </li> :
                        <li className={`nav-header__item ${props.active == "deposits" ? "button_violet" : "button" }`.trim()}>
                          <NavLink className="nav-header__link" to={"/managers"}>
                            <FontAwesomeIcon icon={faMoneyBill}/>Депозиты
                          </NavLink>
                        </li>
                    }
                  </ul>
                </nav>
                <div className="burger-header__profile profile-header">
                  <NavLink className="profile-header__link" to={"/profile"}>
                    <div className="profile-header__image profile-image"></div>
                    <ul className="profile-header__content">
                      <li className="profile-header__name">Name Surname</li>
                      <li className="profile-header__role">Project Manager</li>
                    </ul>
                  </NavLink>
                </div>
              </Burger>
              <BurgerTarget className="header__burger-target" idState="header-menu">
                {
                  burger?.open ?
                    <FontAwesomeIcon icon={faXmark}/> :
                    <FontAwesomeIcon icon={faBars}/>
                }
              </BurgerTarget>
            </React.Fragment> :
            <React.Fragment>
            <nav className="header__nav nav-header">
              <ul className="nav-header__list">
                <li className={`nav-header__item ${props.active == "customers" ? "button_violet" : "button"}`.trim()}>
                  <NavLink className="nav-header__link" to={"/customers"}>
                    <FontAwesomeIcon icon={faUser}/>Клиенты
                  </NavLink>
                </li>
                {
                  user.role == "admin" ?
                    <li className={`nav-header__item ${props.active == "managers" ? "button_violet" : "button"}`.trim()}>
                      <NavLink className="nav-header__link" to={"/managers"}>
                        <FontAwesomeIcon icon={faUserGear}/>Менеджеры
                      </NavLink>
                    </li> :
                    <li className={`nav-header__item ${props.active == "deposits" ? "button_violet" : "button"}`.trim()}>
                      <NavLink className="nav-header__link" to={"/deposits"}>
                        <FontAwesomeIcon icon={faMoneyBill}/>Депозиты
                      </NavLink>
                    </li>
                }
              </ul>
            </nav>
            <div className="header__profile profile-header">
              <NavLink className="profile-header__link" to={"/profile"}>
                <div className="profile-header__image profile-image"></div>
                <ul className="profile-header__content">
                  <li className="profile-header__name">Имя Фамилия</li>
                  <li className="profile-header__role">Менеджер</li>
                </ul>
              </NavLink>
            </div>
            </React.Fragment>
        }
      </div>
    </header>
  )
}

export default Header