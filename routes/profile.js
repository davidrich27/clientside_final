var express = require('express');
var router = express.Router();
var models;
var modelview;

/* HANDLES ALL requests */
router.use('/', function(req, res, next) {
  models = req.locals.models;
  modelview = req.locals.modelview;

  modelview.title = 'User Profile';
  modelview.page = 'User Profile';
  modelview.menuId = 'profile';
  next();
});

router.get('/', function(req, res, next) {
  if (modelview.session.loggedIn) {
    req.redirect(username);
  } else {
    modelview.foundUser = false;
    res.render('profile', modelview);
  }
});

/* GET user profile page. */
router.get('/:username', function(req, res, next) {

  models.User.findOne({
    where: {
      username: req.params.username
    }
  }).then(function(user) {
    // if user does not exist
    if(!user) {
      modelview.foundUser = false;
    }
    // if user found in database
    else {
      modelview.foundUser = true;
      modelview.user = user;

    }
  })
  res.render('profile', modelview);
});

module.exports = router;
