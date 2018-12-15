var express = require('express');
var router = express.Router();

/* HANDLES ALL requests */
router.use('/', function(req, res, next) {
  models = req.locals.models;
  modelview = req.locals.modelview;
  next();
});

/* CREATE watchlist query */
router.get('/create/', function(req, res, next) {
  var generalTerm = req.query.generalTerm;

  models.Query.create({
  })
})

/* DELETE watchlist query */
router.get('/remove/:id, function(req, res, next) {
  var id = req.params.id;
  var

  models.Query.destroy({
    where: {

    }
  })
  .then(function(results) {
  })
  .catch(function(error) {
  });
});


module.exports = router;
