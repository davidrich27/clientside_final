var express = require('express');
var router = express.Router();

/* HANDLES ALL requests */
router.use('/', function(req, res, next) {
  models = req.locals.models;
  modelview = req.locals.modelview;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

module.exports = router;
