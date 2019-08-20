`use strict`;

const express = require('express');
const http = require('http');
const passport = require('passport');
const logger = require(__basedir + '/utils/logger.js');
const auth = require(__basedir + `/utils/auth.js`);
const windowAuth = require(__basedir + '/utils/window-auth.js');

var router = express.Router();

/*Login screen*/
router.get('/login', (req, res, next) => {
  // console.log(`Session: ${req.session}`);
  res.render('login', {
    title: 'Login',
    pageName: 'login-page',
    displayName: ''
  });
});

router.get('/error', (req, res, next) => {
  // console.log(`Session: ${req.session}`);
  res.render('error', {
    title: 'error',
    pageName: 'error-page',
    displayName: ''
  });
});

/*Authenticate user*/
router.post('/login', (req, res, next) => {
  // console.log(req.body);
  auth.loginUser(req, res, next);
  // res.redirect(`/`);
});

/*Logout user*/
router.all('/logout', (req, res, next) => {
  // console.log(`Session: ${req.session}`);
  auth.logoutUser(req, res, next);
});

/* GET home page. */
router.get('/', passport.authenticate("WindowsAuthentication"), auth.isAuthorized, getBreadcrumbs, (req, res, next) => {
  // logger.info(req)
  res.render('home', {
    title: 'Home Page',
    breadcrumbs: req.breadcrumbs,
    displayName: req.user
  });
});

/* GET search submit results page. */
router.all('/searchresults/', passport.authenticate("WindowsAuthentication"), auth.isAuthorized, getBreadcrumbs, (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length > 0) { // if query params exist in Form POST 
    req.session.searchParams = JSON.stringify(req.body); // store to session
  }
  res.cookie('searchParams', req.session.searchParams, { maxAge: 900000, httpOnly: false }); // store to cookie for client side js access.
  res.render('searchresults', {
    title: 'Search Results',
    breadcrumbs: req.breadcrumbs,
    displayName: req.user
  });
});

/* GET brand landing page. */
router.all('/brands/:brandName',  passport.authenticate("WindowsAuthentication"), auth.isAuthorized, getBreadcrumbs, (req, res, next) => {
  res.render('searchresults', {
    title: 'Search Results',
    breadcrumbs: req.breadcrumbs,
    displayName: req.user
  });
});

/* GET brand project detail page page. */
router.all('/brands/:brandName/:projectId',  passport.authenticate("WindowsAuthentication"), auth.isAuthorized, getBreadcrumbs, (req, res, next) => {
  res.render('searchdetail', {
    title: 'Search Detail',
    breadcrumbs: req.breadcrumbs,
    displayName: req.user
  });
});

// Get team landing page
router.get('/teams/:teamName', passport.authenticate("WindowsAuthentication"),auth.isAuthorized, getBreadcrumbs, (req, res, next) => {
  logger.info(req.breadcrumbs)
  res.render('searchresults', {
    title: 'Search Results',
    breadcrumbs: req.breadcrumbs,
    displayName: req.user
  });
})

// Get team product detail page
router.get('/teams/:teamName/:projectId', passport.authenticate("WindowsAuthentication"), auth.isAuthorized, getBreadcrumbs, (req, res, next) => {
  res.render('searchdetail', {
    title: 'Search Detail',
    breadcrumbs: req.breadcrumbs,
    displayName: req.user
  });
})

/* GET Search Result detail page. */
router.all('/searchresults/:projectId',  passport.authenticate("WindowsAuthentication"), auth.isAuthorized, getBreadcrumbs, (req, res, next) => {
  res.render('searchdetail', {
    title: 'Search Detail',
    breadcrumbs: req.breadcrumbs,
    displayName: req.user
  });
});

function getBreadcrumbs(req, res, next) {
  const urls = req.originalUrl.split('/');
  const staticBreadcrumbNames = ["","teams", "page","brands"];
  const nameSpaceFormat = {'searchresults' : 'search results','FisherPriceBrands' : 'Fisher-Price Brands','FisherPriceFriends' : 'Fisher-Price Friends','MattelBoys' : 'Mattel Boys','MattelGirls': 'Mattel Girls'}
  var isBreadCrumbStatic = '';
  urls.shift();
  req.breadcrumbs = urls.map((url, i) => {
    isBreadCrumbStatic = staticBreadcrumbNames.indexOf(url) != -1;
    url = url.indexOf("?") != -1 ? url.split('?')[0] : url;
    if(!isBreadCrumbStatic){
      return {
        breadcrumbName: nameSpaceFormat[url] || ((url.charAt(0).toUpperCase() + url.slice(1)).replace(/-/g,' ')),
        breadcrumbUrl: `/${urls.slice(0, i + 1).join('/')}`,
      };
    }
  });
  next();
}

module.exports = router;
