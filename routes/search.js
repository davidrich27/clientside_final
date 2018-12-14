var express = require('express');
var router = express.Router();

/* HANDLES ALL requests */
router.use('/', function(req, res, next) {
  models = req.locals.models;
  modelview = req.locals.modelview;
  next();
});

/* GET search page. */
router.get('/', function(req, res, next) {
  modelview.page = 'Search';
  modelview.menuId = 'search';
  res.render('search', modelview);
});

/* POST search */
router.post('/', function(req, res, next) {
  modelview.page = 'Search';
  modelview.menuId = 'search';
  res.render('search', modelview);
});


module.exports = router;
