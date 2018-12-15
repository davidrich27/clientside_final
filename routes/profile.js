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

/* GET user profile page. */
router.get('/', function(req, res, next) {
  var username = modelview.session.username;
  models.User.findOne({
    where: {
      username: username
    },
    //include: models.Query
  })
  .then(function(user) {
    // if user does not exist
    if(!user) {
      modelview.foundUser = false;
      console.log('Could not find User!');
      res.redirect('../../logout');
    }
    // if user found in database
    else {
      modelview.foundUser = true;
      modelview.user = user;
      modelview.queries = [];
    }
  })
  .then(function(){
    res.render('profile', modelview);
  })
});

module.exports = router;
