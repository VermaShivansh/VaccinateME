import React, { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link, NavLink } from "react-router-dom"
gsap.registerPlugin(ScrollTrigger)

function Navbar(props) {
  useEffect(() => {
    gsap.to(".logo", { delay: 0.3, duration: 1, x: 7, y: -7, yoyo: true, repeat: -1 })
  }, [])
  async function handleLogout() {
    document.querySelector(".navbar-collapse").classList.remove("show")
    localStorage.removeItem("vaccinateMEToken")
    props.setisLoggedIn(false)
  }
  return (
    <div className="navBar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light position-fixed">
        <div className="container-fluid position-relative">
          <Link className="navbar-brand mx-1" to="/">
            <img className="logo" src="https://i.ibb.co/KhHnNbP/injection.png" width="25px" alt="" /> VaccinateME
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse position-relative" id="navbarNavAltMarkup">
            <div className="navbar-nav position-absolute">
              <NavLink exact onClick={() => document.querySelector(".navbar-collapse").classList.remove("show")} className="nav-link mx-1" aria-current="page" to="/">
                Register
              </NavLink>
              <NavLink onClick={() => document.querySelector(".navbar-collapse").classList.remove("show")} className="nav-link mx-1" to="/track">
                Track Your Status
              </NavLink>
              <NavLink onClick={() => document.querySelector(".navbar-collapse").classList.remove("show")} className="nav-link mx-1" to="/staff">
                Staff Section
              </NavLink>
              {props.isLoggedIn && (
                <NavLink onClick={handleLogout} className="nav-link mx-1 text-muted bg-transparent" to="/" exact>
                  LogOut
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar
