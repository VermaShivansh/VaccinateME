const User = require("../models/users");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(
      token,
      "thisismynewcourseprakharsrivastavahellooldfriend"
    );
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("User not found");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(404).send("Error");
  }
};

module.exports = auth;
