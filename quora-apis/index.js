const express = require("express");
const session = require('express-session');
const app = express();
const port = 8000;
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle=require("./config/passport-google-oauth")
const db = require("./config/mongoose");
const nodemailer = require("./config/nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser= require('cookie-parser');

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials:true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", require("./routes"));
app.listen(port, function (e) {
  if (e) {
    console.log("Error:", e);
  } else {
    console.log(`Server is running on ${port}`);
  }
});
