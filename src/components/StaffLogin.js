import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"

import Axios from "axios"

function StaffLogin(props) {
  let [username, setusername] = useState()
  let [password, setpassword] = useState()
  let [loginRequest, setloginRequest] = useState(false)
  async function handleSubmit(e) {
    e.preventDefault()
    setloginRequest(true)
    try {
      let response = await Axios.post("/vlogin", { username, password })
      localStorage.setItem("vaccinateMEToken", response.data.token)
      if (response.status === 200) {
        props.setisLoggedIn(true)
      } else {
        setloginRequest(false)
        alert("Wrong username and password combination!!!")
      }
    } catch {
      setloginRequest(false)
      alert("Wrong username and password combination!!!")
    }
  }
  return (
    <div className="midbody d-flex justify-content-center mb-4">
      <div className="midbodyContent align-self-center col-md-5 col-11 col-sm-10">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={(e) => setusername(e.target.value)} autoFocus type="text" placeholder="Enter Username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            {!loginRequest ? (
              <>Submit</>
            ) : (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Authenticating{" "}
              </>
            )}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default StaffLogin
