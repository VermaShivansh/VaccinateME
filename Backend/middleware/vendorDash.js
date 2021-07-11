const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

const vendorDash = (req, res, next) => {
  const cookie=req.cookies
  console.log(cookie.auth)
  if(cookie.auth==='hello'){
    next();
  }
  else{
    res.status(401).send("authorization failed")
  }
  // if (req.session.isAuth) {
  //   console.log(req.session.isAuth)
  //   next();
  // } else {
  //   res.status(404).send("Not Found")
  // }
};

module.exports = vendorDash;
