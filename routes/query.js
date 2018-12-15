var express = require('express');
var router = express.Router();

/* HANDLES ALL requests */
router.use('/', function(req, res, next) {
  models = req.locals.models;
  modelview = req.locals.modelview;
  next();
});

/* GET autocomplete results. */
router.get('/autocomplete/:object/', function(req, res, next) {
  var object = req.params.object;
  console.log("OBJECT: "+object)
  var term = req.query.q;
  console.log("TERM: "+term);

  models[object].findAll({
    
  })
  .then(function(results) {
    console.log(results);
    results = JSON.stringify(results);
    console.log("RESULTS: "+results);
    res.send(results);
  })
  .catch(function(error) {
    console.log(error);
  });
});

module.exports = router;
