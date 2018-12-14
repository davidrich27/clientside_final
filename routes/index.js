var express = require('express');
var router = express.Router();

/* HANDLES ALL requests */
router.use('/', function(req, res, next) {
  models = req.locals.models;
  modelview = req.locals.modelview;
  // Default page and menuId based on Router
  modelview.page = 'Home';
  modelview.menuId = 'home';
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', modelview);
});

module.exports = router;
