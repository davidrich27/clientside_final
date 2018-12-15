var express = require('express');
var router = express.Router();
var models;
var modelview;

/* HANDLES ALL requests */
router.use('/', function(req, res, next) {
  models = req.locals.models;
  modelview = req.locals.modelview;
  next();
});

/* GET login page */
router.get('/', function(req, res, next) {
  req.session.destroy();
  res.redirect('../');
});

module.exports = router;
