const express = require("express")
const User = require("../models/users")
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)
const router = new express.Router()
const fast2sms = require("fast-two-sms")
const auth = require("../middleware/auth")
const vendorAuth = require("../middleware/vendor")
const vendorDash = require("../middleware/vendorDash")
const Local = require("../models/locality")
const { findOneAndDelete } = require("../models/users")

//Vendor Login Page

router.post("/vlogin", vendorAuth, (req, res) => {
  // req.session.isAuth = true
  // res.status(200).cookie("auth", "hello").json({
  //   message: "Login in Successful",
  // })
  res.status(200).json({
    token: "abcdefg",
    success: 0,
  })
})
router.post("/vlogout", (req, res) => {
  // res.clearCookie("auth")
  // req.session.destroy((err) => {
  //   if (err) throw err
  //   res.status(200).send("Successfully Logged out")
  // })
  res.status(200)
})
router.post("/login/vendor", async (req, res) => {
  try {
    const locals = await Local.find({ totalCandidate: { $gt: 0 } }).populate("registeredUser")

    // const local=await Local.deleteOne({totalCandidate:0})
    // console.log(local)

    res.status(200).json({
      message: "Success",
      local: locals,
    })
  } catch (error) {
    res.status(404).send(error)
  }
})
router.post("/login/vendor/vaccinated", async (req, res) => {
  const custId = req.body.customerId
  const authCode = req.body.authCode

  try {
    const user = await User.findOne({
      customerId: custId,
      authCode: authCode,
    })
    if (!user) {
      res.status(404).send("Unable To Find Customer")
    }
    const pincode = user.pincode
    const id = user._id
    user.vaccinationSuccessful = true
    await user.save()

    console.log(user)
    console.log(user._id)
    console.log(pincode)

    // const local = await Local.findOne({ pincode: user.pincode });
    // console.log(local);
    // local.registeredUser.pop(user._id);
    await Local.remove(pincode, id)
    // const local=await Local.deleteOne({totalCandidates:0})
    // console.log(local)

    res.status(200).json({
      User: user,
      message: "Successfully Vaccinated",
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
