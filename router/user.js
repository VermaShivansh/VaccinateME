const express = require("express")
const User = require("../models/users")
const router = new express.Router()
const fast2sms = require("fast-two-sms")
const auth = require("../middleware/auth")
const vendorAuth = require("../middleware/vendor")
const { register, login, status } = require("../controllers/user")
const { sendotp } = require("../controllers/otp")
const jwt = require("jsonwebtoken")

router.get("/", (req, res) => {
  res.render("app.ejs")
})

router.get('/all',async(req,res)=>{
  const users=await User.find()
  res.json({
    allusers:users
  })
})

// For registration
router.get("/register", (req, res) => {
  res.render("register.ejs")
})

// Registering the user
router.post("/register", register)

// Login In With Page
router.post("/login", login)

//Status Of Vaccination
router.get("/status", auth, status)

// Sending Messages With Customer ID
router.post("/sendMessage", async (req, res) => {
  console.log(req.body)
  const response = await fast2sms.sendMessage({
    authorization: process.env.API_KEY,
    message: req.body.message,
    numbers: [req.body.number],
  })
  res.send(response)
})

//Vendor Login Page
router.get("/login/vendor", vendorAuth, (req, res) => {
  res.send("Welcome To Vendor Login Page")
})

module.exports = router
