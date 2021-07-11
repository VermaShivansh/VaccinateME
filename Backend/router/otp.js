const express = require("express");
const User = require("../models/users");
const router = new express.Router();
const fast2sms = require("fast-two-sms");
const auth = require("../middleware/auth");
const vendorAuth = require("../middleware/vendor");
const { sendOtp, verifyOtp } = require("../controllers/otp");
const jwt = require("jsonwebtoken");

//Number Verification
router.post("/sendotp", sendOtp);

// Verify Endpoint
router.post("/verifyotp", verifyOtp);

module.exports = router;
