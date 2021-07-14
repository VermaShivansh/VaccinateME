const express = require("express")
const User = require("../models/users")
const Local = require("../models/locality")
const router = new express.Router()
const fast2sms = require("fast-two-sms")
const auth = require("../middleware/auth")
const vendorAuth = require("../middleware/vendor")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  const user = new User(req.body)
  const local = new Local(req.body)

  try {
    await user.generateId()
    await user.save()
    const id = user._id
    const pincode = user.pincode

    // local.registeredUser = id;
    const x = await Local.assign(pincode, id)
    if (!x) {
      local.registeredUser = id
      await local.save()
    }

    res.send({
      user: user,
      local: local,
    })
  } catch (error) {
    res.send(error)
  }
}

exports.login = async (req, res) => {
  const custId = req.body.customerId
  try {
    const user = await User.verifyUser(custId)
    const token = await user.generateAuthToken()

    res.send({ user, token })
  } catch (error) {
    res.status(404).send(error)
  }
}

exports.status = (req, res) => {
  try {
    res.status(200).send("Congratulations")
  } catch (error) {
    res.status(404).send({ error: "You are unauthorized" })
  }
}
