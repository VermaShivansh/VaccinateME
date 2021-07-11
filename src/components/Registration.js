import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useImmer } from "use-immer"
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap"
import MaskedInput from "react-text-mask"
import { Link } from "react-router-dom"

function Registration() {
  const [phoneNumber, setphoneNumber] = useState()
  const [otpRequest, setotpRequest] = useState(false)
  const [otp, setotp] = useState()
  const [success, setsuccess] = useState(false)
  const [sendingOTP, setsendingOTP] = useState(false)
  const [verifyingOTP, setverifyingOTP] = useState(false)
  const [submittingForm, setsubmittingForm] = useState(false)
  const [isFormSubmitted, setisFormSubmitted] = useState(false)
  const [validated, setValidated] = useState(false)
  const [userData, setuserData] = useImmer({
    firstName: "...",
    lastName: "...",
    email: "...",
    phone: phoneNumber,
    address: {
      houseNumber: "X",
      sector: "X",
      society: "X",
      landmark: "X",
      city: "X",
      pincode: 0,
      state: "X",
    },
    age: 0,
    aadharNumber: 123,
    disability: false,
    pincode: 0,
    locations: "",
  })
  useEffect(() => {
    document.querySelector(".phoneField").focus()
    document.querySelector(".headerdesign").classList.remove("removeHeaderDesign")
  }, [])
  useEffect(() => {
    if (success) {
      document.querySelector(".firstNameField").focus()
      window.scrollTo(0, 510)
    }
  }, [success])
  async function handleSendOTP(e) {
    e.preventDefault()
    if (phoneNumber.toString().length === 10) {
      setsendingOTP(true)
      try {
        let response = await Axios.post("/sendotp", { phoneNumber })
        //console.log(response.data)
        setsendingOTP(false)
        setotpRequest(true)
      } catch {
        console.log("error")
      }
    }
  }
  async function handleSubmitOTP(e) {
    e.preventDefault()
    setotp(otp.substr(0, 3) + otp.substr(4, 3))
    if (otp.toString().length === 6) {
      setverifyingOTP(true)
      try {
        let response = await Axios.post("/verifyotp", { phoneNumber, code: otp })
        // console.log(response.data)
        setverifyingOTP(false)
        setsuccess(true)
        setuserData((draft) => {
          draft.phone = phoneNumber
        })
      } catch {
        console.log("error")
      }
    }
  }
  async function handleFormSubmit(e) {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      // console.log(e)
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
    e.preventDefault()
    // console.log(userData)
    if (form.checkValidity() === true) {
      try {
        let apiresponse = await Axios.get(`https://api.postalpincode.in/pincode/${userData.pincode}`)
        // console.log(apiresponse)
        if (apiresponse.data[0].PostOffice != null) {
          setuserData((draft) => {
            draft.locations = apiresponse.data[0].PostOffice.map((element) => element.Name).join(", ")
            // console.log(draft.locations)
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
  useEffect(async () => {
    if (userData.locations !== "") {
      try {
        setsubmittingForm(true)
        // console.log(userData)
        let response = await Axios.post("/register", userData)
        // console.log(response.data)
        let message = `Appointment Successful for ${response.data.user.firstName} ${response.data.user.lastName}.Your CustomerID is ${response.data.user.customerId}. Your Auth Code is ${response.data.user.authCode}.`
        let response2 = await Axios.post("/sendMessage", { message, number: parseInt(phoneNumber) })
        setsubmittingForm(false)
        setisFormSubmitted(true)
        // console.log(response2.data)
      } catch (e) {
        console.log(e)
      }
    }
  }, [userData.locations])
  return (
    <div className="midbody d-flex justify-content-center">
      {/* Below Content is displayed before OTP Validation*/}

      {!success && (
        <div className="midbodyContent align-self-center col-md-5 col-11 col-sm-10">
          <div className="Registration">
            <form onSubmit={!otpRequest ? handleSendOTP : handleSubmitOTP} className="RegistrationForm">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label mb-4">
                  Enter your Phone Number
                </label>
                <MaskedInput mask={[/[1-9]/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]} guide={false} autoComplete="off" autoFocus required disabled={otpRequest} onChange={(e) => setphoneNumber(e.target.value.substr(0, 3) + e.target.value.substr(4, 3) + e.target.value.substr(8, 4))} className="phoneField form-control" id="exampleFormControlInput1" placeholder="XXX-XXX-XXXX" />
              </div>
              <div className={`d-flex justify-content-${!otpRequest ? `end` : `between`}`}>
                {" "}
                {otpRequest && (
                  <MaskedInput
                    mask={[/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                    guide={false}
                    autoFocus
                    autoComplete="off"
                    required
                    onChange={(e) => {
                      setotp(e.target.value)
                    }}
                    className="form-control w-50"
                    id="exampleFormControlInput2"
                    placeholder="Enter OTP"
                  />
                )}
                <button className="OTP">
                  {!otpRequest && !sendingOTP && <span>Get OTP</span>}
                  {!otpRequest && sendingOTP && (
                    <span>
                      {" "}
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Sending
                    </span>
                  )}
                  {otpRequest && !verifyingOTP && <span>Verify OTP</span>}
                  {otpRequest && verifyingOTP && (
                    <span>
                      {" "}
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Veryfing
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*Below Content is displayed after OTP Validation  */}

      {success && !isFormSubmitted && (
        <div className="FullDetailsEntryContainer col-12 p-4" style={{ marginTop: "18vh" }}>
          <div className="FullDetailsEntry col-12 col-md-8 mx-auto" style={{ color: "white" }}>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setuserData((draft) => {
                        draft.firstName = e.target.value
                      })
                    }
                    maxLength="25"
                    required
                    type="text"
                    placeholder="First name"
                    className="firstNameField"
                  />
                  <Form.Control.Feedback type="invalid">Please enter valid First Name.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationLastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setuserData((draft) => {
                        draft.lastName = e.target.value
                      })
                    }
                    maxLength="25"
                    required
                    type="text"
                    placeholder="Last name"
                  />
                  <Form.Control.Feedback type="invalid">Please enter valid Last Name.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationEmail">
                  <Form.Label>
                    Email {`(`}Optional{`)`}
                  </Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setuserData((draft) => {
                        draft.email = e.target.value
                      })
                    }
                    type="email"
                    placeholder="Email (Optional)"
                    aria-describedby="inputGroupPrepend"
                  />
                  <Form.Control.Feedback type="invalid">Please choose a valid email.</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="4" controlId="validationMobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <MaskedInput mask={[/[5-9]/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]} required value={phoneNumber} disabled className="form-control" placeholder="Enter a phone number" guide={false} id="my-input-id" />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationAadharNumber">
                  <Form.Label>Aadhar Number</Form.Label>
                  <MaskedInput
                    onChange={(e) =>
                      setuserData((draft) => {
                        draft.aadharNumber = e.target.value.substr(0, 4) + e.target.value.substr(5, 4) + e.target.value.substr(10, 4)
                      })
                    }
                    mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                    minLength="12"
                    required
                    className="form-control"
                    placeholder="XXXX-XXXX-XXXX"
                    id="my-input-id"
                    guide={false}
                  />
                  <Form.Control.Feedback type="invalid">Please Enter a valid Aadhar Number</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationAge">
                  <Form.Label>Age</Form.Label>
                  <MaskedInput
                    onChange={(e) =>
                      setuserData((draft) => {
                        draft.age = e.target.value
                      })
                    }
                    mask={[/\d/, /\d/, /\d/]}
                    guide={false}
                    min="18"
                    max="130"
                    type="number"
                    placeholder="Age"
                    required
                    className="form-control"
                  />
                  <Form.Control.Feedback type="invalid">Applicant must be 18+</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="4" controlId="validationHouseNumber">
                  <Form.Label>House Number</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setuserData((draft) => {
                        draft.address.houseNumber = e.target.value
                      })
                    }
                    required
                    maxLength="18"
                    type="text"
                    placeholder="24/A"
                  />
                  <Form.Control.Feedback type="invalid">Please enter a valid info</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationSector">
                  <Form.Label>Sector</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setuserData((draft) => {
                        draft.address.sector = e.target.value
                      })
                    }
                    maxLength="50"
                    required
                    type="text"
                    placeholder="D/F/C"
                  />
                  <Form.Control.Feedback type="invalid">Please enter a valid info</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationColony">
                  <Form.Label>Society / Colony</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setuserData((draft) => {
                        draft.address.society = e.target.value
                      })
                    }
                    maxLength="50"
                    required
                    type="text"
                    placeholder="Aashiyana Colony or Appartments"
                  />
                  <Form.Control.Feedback type="invalid"> Please enter a valid info</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="4" controlId="validationLandmark">
                  <Form.Label>
                    Landmark {`(`}Optional{`)`}
                  </Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setuserData((draft) => {
                        draft.address.landmark = e.target.value
                      })
                    }
                    maxLength="50"
                    type="text"
                    noValidate
                    placeholder="Near LPC School"
                  />
                  <Form.Control.Feedback type="invalid"> Please enter a valid info</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setuserData((draft) => {
                        draft.address.city = e.target.value
                      })
                    }
                    maxLength="30"
                    type="text"
                    placeholder="City"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please provide a valid city.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom04">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setuserData((draft) => {
                        draft.address.state = e.target.value
                      })
                    }
                    maxLength="35"
                    type="text"
                    placeholder="State"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please provide a valid state.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  <Form.Label>Pin-Code</Form.Label>
                  <MaskedInput
                    onChange={(e) =>
                      setuserData((draft) => {
                        draft.address.pincode = e.target.value
                        draft.pincode = e.target.value
                      })
                    }
                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                    className="form-control"
                    placeholder="226012"
                    guide={false}
                    id="my-input-id"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Enter a valid Pin-Code</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group>
                <Form.Check
                  onChange={(e) =>
                    setuserData((draft) => {
                      draft.disability = !userData.disability
                    })
                  }
                  label="Specially Abled?"
                />
                <Form.Check required label="Agree to terms and conditions" feedback="You must agree before submitting." />
              </Form.Group>
              <Button type="submit">
                {submittingForm ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Submitting
                  </>
                ) : (
                  "Submit Form"
                )}
              </Button>
            </Form>
          </div>
        </div>
      )}

      {/*Below is Final Confirmation Screen*/}
      {success && isFormSubmitted && (
        <Container fluid className="align-self-center">
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Alert show={true} variant="success">
                <Alert.Heading>Registration Successfull!!!</Alert.Heading>
                <p>A Confirmation Message has been sent to you mobile number {phoneNumber} along with the CustomerID. Please use this customer ID to track your Vaccination Status.</p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button variant="outline-success">
                    <Link style={{ textDecoration: "none", color: "black" }} to="/track">
                      Track your Vaccination Status
                    </Link>
                  </Button>
                </div>
              </Alert>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default Registration
