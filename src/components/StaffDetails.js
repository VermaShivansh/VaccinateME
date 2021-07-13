import React, { useEffect, useState } from "react"
import { Accordion, Container, Table, Button, Modal, Form, Alert } from "react-bootstrap"
import Axios from "axios"
function StaffDetails(props) {
  let [data, setdata] = useState([])
  let [modalShow, setModalShow] = React.useState(false)
  const [show, setShow] = useState(-1)
  useEffect(() => {
    getData()
    window.scrollTo(0, 500)
  }, [])
  let customerId, authCode
  /*api functions*/
  async function getData() {
    try {
      let response = await Axios.post("/login/vendor")
      setdata(response.data.local)
    } catch (e) {
      console.log(e)
    }
  }
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      // console.log(customerId, authCode)
      let response = await Axios.post("login/vendor/vaccinated", { customerId, authCode })
      setModalShow(false)
      if (response.status == 200) {
        setShow(1)
        document.querySelector(".alertingBox").classList.add("opacity1")
        setTimeout(() => {
          document.querySelector(".alertingBox").classList.remove("opacity1")
        }, 5000)
        setTimeout(() => {
          setShow(-1)
        }, 6000)
        window.scrollTo(0, 0)
      } else {
        setShow(0)
        document.querySelector(".alertingBox").classList.add("opacity1")
        setTimeout(() => {
          document.querySelector(".alertingBox").classList.remove("opacity1")
        }, 5000)
        setTimeout(() => {
          setShow(-1)
        }, 6000)
        window.scrollTo(0, 0)
      }
    } catch (e) {
      setModalShow(false)
      console.log(e)
      setShow(0)
      document.querySelector(".alertingBox").classList.add("opacity1")
      setTimeout(() => {
        document.querySelector(".alertingBox").classList.remove("opacity1")
      }, 5000)
      setTimeout(() => {
        setShow(-1)
      }, 6000)
      window.scrollTo(0, 0)
    }
  }

  data.map((element, index) => {
    // console.log(element, element.registeredUser.length)
    return 1
  })

  /*Modal Window*/
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control onChange={(e) => (customerId = e.target.value)} autoComplete="off" type="text" placeholder="CustomerID" maxLength="8" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Control onChange={(e) => (authCode = e.target.value)} autoComplete="off" type="text" placeholder="Auth Code" maxLength="6" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check required type="checkbox" label="I have Verified the Vaccination" />
            </Form.Group>
            <hr />
            <Button variant="primary" type="submit">
              Complete Vaccination
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <div className="midbody staff p-0 ">
      <div className="text-center col-12 alertingBox p-1">
        {show != -1 && (
          <Alert variant={show ? "success" : "danger"} className="col-md-5 m-auto " onClose={() => setShow(-1)} dismissible>
            <Alert.Heading>
              {" "}
              {show == 0 && <span>Failed!!!</span>} {show == 1 && <span> Vaccination Successfully Verified!!!</span>}
            </Alert.Heading>
            <hr />
            <p>
              {show == 0 && <span>CustomerID and Auth Code do not Match !</span>} {show == 1 && <span> User has been successfully verified.</span>}{" "}
            </p>
          </Alert>
        )}
      </div>
      <Container className="offset-md-1 mb-3 col-md-10 p-0 p-md-2">
        <Button variant="light" onClick={() => setModalShow(true)}>
          Verify A Vaccination
        </Button>
      </Container>
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
      <Container className="offset-md-1 col-md-10 p-0 p-md-2 bg-white overflow-auto">
        <Container className="p-0 p-md-2">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ width: "10vw" }}>Sr. No.</th>
                <th style={{ width: "10vw" }}>PinCode</th>
                <th style={{ width: "20vw" }}>Vaccinations Left</th>
                <th style={{ width: "40vw" }}>Locations Under Pincode</th>
              </tr>
            </thead>
          </Table>
          <Container className="p-0 m-0 accordionContainer">
            <Accordion>
              {data.map((element, index) => {
                return (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>
                      <Table>
                        <tbody>
                          <tr>
                            <td style={{ width: "11vw" }}>{index + 1}</td>
                            <td style={{ width: "12vw" }}>{element.pincode}</td>
                            <td className="vleft">{element.registeredUser.length}</td>
                            <td style={{ width: "42vw" }} className="position-relative">
                              {element.registeredUser[0].locations}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Table className="innerTable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {element.registeredUser.map((user, nestindex) => {
                            return (
                              <tr key={nestindex} className="inner">
                                <td>{nestindex + 1}</td>
                                <td>
                                  {user.firstName} {user.lastName}
                                </td>
                                <td>{user.phone}</td>
                                <td>
                                  {user.address.sector}&nbsp;{user.address.houseNumber},&nbsp;{user.address.society},&nbsp;{user.address.city},&nbsp;{user.address.state}&nbsp;Landmark:-{user.address.landmark}&nbsp;
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                )
              })}
            </Accordion>
          </Container>
        </Container>
      </Container>
    </div>
  )
}

export default StaffDetails
