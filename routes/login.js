var express = require('express');
var router = express.Router();
var models;
var modelview;

/* HANDLES ALL requests */
router.use('/', function(req, res, next) {
  models = req.locals.models;
  modelview = req.locals.modelview;
  // Default page and menuId based on Router
  modelview.page = 'Login or Register';
  modelview.menuId = 'login';
  next();
});

/* GET login page */
router.get('/', function(req, res, next) {
  console.log('GET login...');
  if (!modelview.session.loggedIn) {
    res.render('login', modelview);
  } else {
    var username = modelview.session.username;
    res.redirect('../profile');
  }
});

/* POST login page */
router.post('/', function(req, res, next) {
  var usernameTxt = req.body.usernameLogin.toLowerCase();
  var passwordTxt = req.body.passwordLogin;

  // query database for user
  models.User.findOne({
    where: {
      username: usernameTxt,
      password: passwordTxt
    }
  }).then(function(user) {
    // output user
    if (!user) {
      modelview.loginError = 'Username or Password is incorrect. Please try again.';
      res.render('login', modelview);
    } else {
      modelview.session.loggedIn = true;
      modelview.session.userId = user.userId;
      modelview.session.username = user.username;
      modelview.session.isAdmin = user.isAdmin;
      res.redirect(`../profile`);
    }
  });
});

module.exports = router;
