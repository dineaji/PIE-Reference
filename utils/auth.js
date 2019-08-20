`use strict`;

// const dotenv = require('dotenv').config({
//   path: '../.env'
// });
const Promise = require('bluebird');
const passport = require('passport');
const ActiveDirectory = require('activedirectory');
const logger = require(__basedir + '/utils/logger.js');

// Read LDAP details from ENV
var LdapUrl = process.env.LDAP_URL;
var bindDN = process.env.SVC_USERNAME;
var bindCredentials = process.env.SVC_PASSWORD;
var searchBase = process.env.SEARCH_BASE || 'dc=corp,dc=mattel,dc=com';
var groupName = process.env.GROUP_NAME || 'PIE2_Users';

var LdapStrategy = require('passport-ldapauth').Strategy;

var OPTS = {
  server: {
    url: LdapUrl,
    bindDn: bindDN,
    bindCredentials: bindCredentials,
    searchBase: searchBase,
    searchFilter: '(samaccountname={{username}})'
  }
};

var ad = Promise.promisifyAll(new ActiveDirectory({
  url: LdapUrl,
  baseDN: searchBase,
  username: bindDN,
  password: bindCredentials
}));

passport.use(new LdapStrategy(OPTS));

var logoutUser = (req, res, next) => {
  req.logout();
  res.redirect('/');
};

// Logs in the user and adds the user info to the session
var loginUser = (req, res, next) => {
  passport.authenticate('ldapauth', function(err, user, info) {

    if (err) {
      req.flash("error_messages", {
        "error": err
      });
      return res.redirect(401, '/login');
    }

    if (!user) {
      req.flash("error_messages", {
        "error": info
      });
      return res.redirect('/login');
    }

    // Check if the user is part of the access group
    var username = user.sAMAccountName;
    ad.isUserMemberOfAsync(username, groupName).then((isMember) => {
        logger.info(username + ' isMemberOf ' + groupName + ': ' + isMember);
      if(!isMember){
        req.flash("error_messages", {
          "error": {message: 'User not Authorized'}
        });
        res.redirect('/login');
      }else {
        passport.serializeUser(function(user, done) {
          var sessionData = {};

          sessionData._id = user.sAMAccountName;
          sessionData.name = user.name;
          done(null, sessionData);
        });

        passport.deserializeUser(function(sessionData, done) {
          done(err, sessionData);
        });

        req.logIn(user, function(err) {
          if (err) {
            req.flash("messages", {
              "error": info
            });
            return res.status(500).json({
              err: 'Could not log in user'
            });
          }
          logger.info(`Login successful!`);
          req.session.save(() => {
            if (req.body.remember) {
              req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
            } else {
              req.session.cookie.expires = false; // Cookie expires at end of session
            }
            res.redirect(`/`);
          })
        });
      }
    }).catch((error) => {
      logger.error('ERROR: ' + JSON.stringify(error));
      req.flash("error_messages", {
        "error": error
      });
      res.redirect('/login');
    });
  })(req, res, next);
};

// Check if the user is authenticated based on the session info
var isAuthenticated = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      logger.info(`Authenticated...`);
      return next();
    } else {
      logger.info('Anonymous, sending to login');
      res.redirect(`/login`);
    }
  } catch (e) {
    return next(e);
  }
};

var isAuthorized = (req, res, next) =>{
  ad.isUserMemberOfAsync(req.user._id, groupName).then((isMember) => {
    logger.info(req.user.name + ' isMemberOf ' + groupName + ': ' + isMember);
    if(!isMember){
      req.flash("error_messages", {
        "error": {message: 'You are not authorized to use this application. Please submit an ticket and request to add in &#34;PIE2_Users&#34; AD Group.'}
      });
      res.redirect('/error');
    }
    return next();
  });  
};

module.exports = {
  loginUser,
  logoutUser,
  isAuthenticated,
  isAuthorized
}
