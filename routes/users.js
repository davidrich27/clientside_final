var express = require('express');
var router = express.Router();

/* HANDLES ALL requests */
router.use('/', function(req, res, next) {
  models = req.locals.models;
  modelview = req.locals.modelview;
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
