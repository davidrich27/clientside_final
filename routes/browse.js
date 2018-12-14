var express = require('express');
var router = express.Router();

/* HANDLES ALL requests */
router.use('/', function(req, res, next) {
  models = req.locals.models;
  modelview = req.locals.modelview;
  modelview.page = 'Browse';
  modelview.menuId = 'browse';
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('browse', modelview);
});

module.exports = router;
