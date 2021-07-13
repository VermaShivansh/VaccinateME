import "./index.css"
import React, { useState, useEffect } from "react"
import { BrowserRouter } from "react-router-dom"

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
