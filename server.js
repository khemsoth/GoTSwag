//  In this project, a website is created where user can create an account, log in, and purchase Game of Thrones souvenirs.
//
//  Written by Alex Chalyy, Igor Guba, Chris Lee Paul, David Lawrence, and Keith Hemsoth.

const bodyParser = require('body-parser');
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
var db = require("./models");
//const User = require('./models/user');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
 
require("dotenv").config();
// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

console.log("beginning of server");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Sessions wasnt needed but will keep for future
app.use(session({
  key: "user_sid",
  secret: "puffanstuff",
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));

app.use('/', require('./routes/users'));

var syncOptions = { force: false };

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

console.log("works up till here");