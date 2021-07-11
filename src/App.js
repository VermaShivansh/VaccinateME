import "./index.css"
import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route, Router } from "react-router-dom"
import Axios from "axios"

//Components
import Navbar from "./components/Navbar"
import Header from "./components/Header"
import MidBody from "./components/MidBody"

function App() {
  let [isLoggedIn, setisLoggedIn] = useState()
  function checkAuth() {
    if (localStorage.getItem("vaccinateMEToken") == "abcdefg") {
      setisLoggedIn(true)
    }
  }
  useEffect(checkAuth, [])
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />
      <Header />
      <MidBody isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />
    </BrowserRouter>
  )
}

export default App
