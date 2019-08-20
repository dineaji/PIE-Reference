`use strict`;

const express = require('express');
const Promise = require('bluebird');
const passportWndAuth = require('passport');
const ActiveDirectory = require('activedirectory');
const logger = require(__basedir + '/utils/logger.js');

var app = express();
// Read LDAP details from ENV
var LdapUrl = process.env.LDAP_URL;
var bindDN = process.env.SVC_USERNAME;
var bindCredentials = process.env.SVC_PASSWORD;
var searchBase = process.env.SEARCH_BASE || 'dc=corp,dc=mattel,dc=com';
var groupName = process.env.GROUP_NAME || 'PIE2_Users';

var WindowsStrategy = require('passport-windowsauth');

var ad = Promise.promisifyAll(new ActiveDirectory({
  url: LdapUrl,
  baseDN: searchBase,
  username: bindDN,
  password: bindCredentials
}));


passportWndAuth.serializeUser(function (user, done) {
  done(null, user);
});

passportWndAuth.deserializeUser(function (user, done) {
  done(null, user);
});

logger.info("windows Auth JS Started..");
// var loginUserWindows = (req, res, next) => {
passportWndAuth.use(new WindowsStrategy({
    ldap: {
      url: LdapUrl,
      base: searchBase,
      bindDN: bindDN,
      bindCredentials: bindCredentials,
      reconnect:true
    },
    integrated: true
  },function(profile,done){
    var user = {
      _id  : profile._json.sAMAccountName,
      name : profile._json.name
    }
    logger.info("user profile created..");
   
    done(null,user)
}));

module.exports = {
  // isAuthenticated,
}
