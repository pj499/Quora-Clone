const express = require("express");
const app = express();
const port = 8000;
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");
const db = require("./config/mongoose");
const nodemailer = require("./config/nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookies= require('cookie-parser');

app.use(cors());
app.use(cookies());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", require("./routes"));
app.listen(port, function (e) {
  if (e) {
    console.log("Error:", e);
  } else {
    console.log(`Server is running on ${port}`);
  }
});
