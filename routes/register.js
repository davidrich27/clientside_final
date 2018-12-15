var express = require('express');
var router = express.Router();

/* HANDLES ALL requests */
router.use('/', function(req, res, next) {
  models = req.locals.models;
  modelview = req.locals.modelview;
  // Default page and menuId based on Router
  modelview.page = 'Login or Register';
  modelview.menuId = 'login';
  next();
});

/* POST registration page */
router.post('/', function(req, res, next) {
  usernameTxt = req.body.usernameRegister.toLowerCase();
  emailTxt = req.body.emailRegister.toLowerCase();
  passwordTxt = req.body.passwordRegister;

  // verify username not already taken
  const userByUsername = models.User.findOne({
    where: {
      username: usernameTxt
    }
  });

  // verify email not already taken
  const userByEmail = models.User.findOne({
    where: {
      email: usernameTxt
    }
  });

  Promise.all([userByUsername, userByEmail])
  .then(responses => {
    // if either, return error message
    if (responses[0]) {
      modelview.loginError = 'That username has already been taken by another account.';
      res.render('login', modelview);
    }
    else if (responses[1]) {
      modelview.loginError = 'That email is already associated with an account.  Did you forget your password?';
      res.render('login', modelview);
    } else {
      // if neither, then add user to database
      models.User.create({
        username: usernameTxt,
        password: passwordTxt,
        email: emailTxt,
        isAdmin: false,
      })
      .then(function(newUser) {
        // log user into current session
        modelview.session.loggedIn = true;
        modelview.session.username = newUser.username;
        modelview.session.isAdmin = newUser.isAdmin;

        // take user to their profile page
        console.log('redirecting...');
        res.redirect('../');
      })
    }
  })
  .catch(function (error) {
    console.log(error);
  });
});

module.exports = router;
