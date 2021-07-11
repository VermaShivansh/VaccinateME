const express = require("express");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const fast2sms = require("fast-two-sms");
const userRoute = require("./router/user");
const otpRoute = require("./router/otp");
const vendorRoute = require("./router/vendor");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');


dotenv.config({ path: "./config.env" });

const app = express();

const mongoURI =
  "mongodb+srv://prakhar:prakhar@seoblog.zd3y4.mongodb.net/MySecondDataBase?retryWrites=true&w=majority";

var store = new MongoDBSession({
  uri: mongoURI,
  collection: "mySessions",
});

app.use(cookieParser());

app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(express.json());

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

//Routes
app.use(userRoute);
app.use(otpRoute);
app.use(vendorRoute);

module.exports = app;
