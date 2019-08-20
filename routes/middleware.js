`use strict`;

// const auth = require(`../utils/auth.js`);
const logger = require('../utils/logger.js');

module.exports = (req, res, next) => {
  logger.info(req.user);

  // Check if user is authenticated, else route to login
  if (req.user)
    return next();
  else {
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT to logIn
    res.redirect(401, `/login`);
  }
};
