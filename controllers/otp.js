const express = require("express")
const User = require("../models/users")
const router = new express.Router()
const fast2sms = require("fast-two-sms")
const vendorAuth = require("../middleware/vendor")
const jwt = require("jsonwebtoken")

//Setting Up Client
const client = require("twilio")(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)

exports.sendOtp = (req, res) => {
  client.verify
    .services(process.env.SERVICE_ID)
    .verifications.create({
      to: `+91${req.body.phoneNumber}`,
      channel: "sms",
    })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
}

exports.verifyOtp = (req, res) => {
  if (req.body.phoneNumber && req.body.code.length === 6) {
    client.verify
      .services(process.env.SERVICE_ID)
      .verificationChecks.create({
        to: `+91${req.body.phoneNumber}`,
        code: req.body.code,
      })
      .then((data) => {
        if (data.status === "approved") {
          res.status(200).send({
            message: "User is Verified!!",
            data,
          })
        }
      })
  } else {
    res.status(400).send({
      message: "Wrong phone number or code :(",
      phonenumber: req.query.phoneNumber,
      data,
    })
  }
}
