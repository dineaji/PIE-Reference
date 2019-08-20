/*
This server
*/
`use strict`;

global.__basedir = __dirname;

const dotenv = require('dotenv').config();
const express = require('express');
const session = require("express-session");
const cors = require('cors');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const _ = require('lodash');
const passport = require('passport');
const os = require('os');
const logger = require(__basedir + '/utils/logger.js');
const service = require(__basedir + '/apps/api/v1/routes/routes.js');
const routes = require(__basedir + '/routes/routes');

// const dotenv = require('dotenv').config();

const port = Number(process.env.ALTERNATIVE_PORT || 3009);
apiUrl = `http://${os.hostname()}:${port}/api/`;
logger.info(apiUrl);
logger.info(`Trying to start server`);

var app = express();
var router = express.Router();
var sessionOpts = {
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  secret: `meow`
};

// Add preflight and cors to all requests
app.use(cors());
app.options('*', cors()); // include before all routes

//Log the server requests
app.use((req, res, next) => {
  var logStr = `${req.method} ${req.url}`;
  logger.log('silly', logStr);
  next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session(sessionOpts));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



// Setup for flash messages
app.use(function (req, res, next) {
  res.locals.success_messages = req.flash('success_messages');
  res.locals.error_messages = req.flash('error_messages');
  next();
});

app.use('/', routes);
app.use('/', service);

var server = app.listen(process.env.PORT, () => {
  logger.info(`Server started on port: ${port}`);
});

hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});


module.exports = server;
