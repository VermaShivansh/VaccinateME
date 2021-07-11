import React, { useEffect, useState } from "react"
import Axios from "axios"

function Track() {
  const [trackRequest, settrackRequest] = useState(false)
  const [isTracking, setisTracking] = useState(false)
  const [userData, setuserData] = useState()
  const [customerId, setcustomerId] = useState()
  useEffect(() => {
    window.scrollTo(0, 510)
  }, [])
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      console.log(customerId)
      setisTracking(true)
      let response = await Axios.post("/login", { customerId })
      setisTracking(false)
      console.log(response.data)
      setuserData(response.data)
      settrackRequest(true)
    } catch {
      console.log("error")
    }
  }
  return (
    <div className="track container mt-5 mt-md-0 py-5 align-self-center">
      <form onSubmit={handleSubmit} className="d-flex justify-content-center offset-md-3 col-md-6 col-11">
        <input onChange={(e) => setcustomerId(e.target.value)} autoComplete="off" autoFocus required type="text" maxLength="8" className="form-control w-100 mx-4 p-2 mb-2" id="exampleFormControlInput1" placeholder="Enter Your CustomerID" />
        <button className="Track p-2 px-3">
          {isTracking ? (
            <>
              {" "}
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Searching{" "}
            </>
          ) : (
            "Track"
          )}
        </button>
      </form>
      {trackRequest && (
        <div className="UserData">
          <div className="row g-0">
            <h6 className="userProfile display-6 m-0 p-1"> {userData.user.firstName}'s Profile</h6>
            <small className="text-muted">#{userData.user.customerId}</small>
            <div className="col-md-3">
              {userData.user.vaccinationSuccessful ? (
                <div className="card bg-success text-white vaccination text-center py-4 p-2 mx-auto">
                  <i className="fas fa-check-circle"></i>
                  <h2 className="text-center">Vaccinated</h2>
                </div>
              ) : (
                <div className="card bg-danger text-white vaccination text-center py-4 p-2 mx-auto">
                  <i className="fas fa-times-circle "></i>
                  <h2 className="text-center">Not Vaccinated</h2>
                </div>
              )}
            </div>

            <div className="col-md-4" id="details">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <h5 className="card-title">Details:</h5>
                    <div className="col-6">
                      <p className="card-title my-0 text-muted">Name:</p>
                      <p className="card-text">
                        {" "}
                        {userData.user.firstName} {userData.user.lastName}
                      </p>
                      <p className="card-title my-0 text-muted">Age:</p>
                      <p>{userData.user.age}</p>
                      <p className="card-title my-0 text-muted">Registration Date:</p>
                      <p className="card-text">{userData.user.registerDate}</p>
                    </div>
                    <div className="col-6">
                      <p className="card-title my-0 text-muted">Specially Abled:</p>
                      {!userData.user.disability ? (
                        <p className="card-text">No</p>
                      ) : (
                        <>
                          {" "}
                          <p>
                            <input type="checkbox" name="" id="" checked readOnly />
                          </p>
                          <p className="card-text">Yes</p>
                        </>
                      )}

                      <p className="card-title my-0 text-muted">Phone No.</p>
                      <p className="card-text">{userData.user.phone}</p>
                      <p className="card-title my-0 text-muted">Vaccination Date:</p>
                      <p className="card-text">Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 address">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <h5 className="card-title">Address:</h5>
                    <div className="col-6">
                      <p className="card-title my-0 text-muted">State:</p>
                      <p className="card-text">{userData.user.address.state}</p>
                      <p className="card-title my-0 text-muted">City:</p>
                      <p className="card-text">{userData.user.address.city}</p>
                      <p className="card-title my-0 text-muted">Pin Code:</p>
                      <p className="card-text">{userData.user.address.pincode}</p>
                    </div>
                    <div className="col-6">
                      <p className="card-title my-0 text-muted">House No:</p>
                      <p className="">{userData.user.address.houseNumber}</p>
                      <p className="card-title my-0 text-muted">Society Name:</p>
                      <p className="">{userData.user.address.society}</p>
                      <p className="card-title my-0 text-muted">Sector:</p>
                      <p className="">{userData.user.address.sector}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-0">
            <div className="col-md-3 mt-md-2 mt-1 authentication">
              <div className="card col-12">
                <div className="card-body p-2 py-3">
                  <h5 className="card-title">Authentication Code:-</h5>
                  <p className="card-text">{userData.user.authCode}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-md-2 mt-1">
              <div className="card Aadhar col-12">
                <div className="card-body p-2 py-3">
                  <h5 className="card-title">Aadhar Number</h5>
                  <p className="card-text" style={{ fontSize: "larger" }}>
                    {userData.user.aadharNumber}{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 cancelAppointment">
              <button type="button" className={`btn btn-${userData.user.vaccinationSuccessful ? "success" : "danger"}`}>
                {userData.user.vaccinationSuccessful ? (
                  <>
                    <i className="fa fa-download" aria-hidden="true"></i> &nbsp;Download Certificate{" "}
                  </>
                ) : (
                  <>
                    <i className="fas fa-times-circle "></i> &nbsp;Cancel Appointment
                  </>
                )}
              </button>
              {/* <button type="button" className="btn btn-success">Download Certificate</button>  */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Track
