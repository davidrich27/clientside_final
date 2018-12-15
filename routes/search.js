var express = require('express');
var router = express.Router();

/* HANDLES ALL requests */
router.use('/', function(req, res, next) {
  models = req.locals.models;
  modelview = req.locals.modelview;

  modelview.page = 'Search';
  modelview.menuId = 'search';
  next();
});

/* GET search page. */
router.get('/', function(req, res, next) {
  if (Object.keys(req.query).length === 0) {
    res.render('search', modelview);
  } else {
    // pull querystring search terms
    var terms = {};
    terms.generalTerm = req.query.generalTerm;
    terms.eventTerm = req.query.eventTerm;
    terms.venueTerm = req.query.venueTerm;
    terms.isAdvanced = req.query.isAdvanced;
    console.log('isAdvanced: '+isAdvanced);

    for (var key in terms) {
      if (terms[key] == "" || terms[key] == 'undefined') {
        terms[key] = '%';
      } else {
        terms[key] = '%'+terms[key]+'%';
      }
    }

    // checks type of search query
    if (!isAdvanced) {
      var results = models.Event.findAll({
        where: {
          [Op.or]: [
            {name: {[Op.like]: generalTerm}},
            {description: {[Op.like]: generalTerm}},
            {venue: {[Op.like]: generalTerm}},
            {tag: {[Op.like]: generalTerm}}
          ]
        }
      })
    } else {
      var results = models.Event.findAll({
        where: {
          [Op.and]: [
            {name: {[Op.like]: generalTerm}},
            {description: {[Op.like]: generalTerm}},
            {venue: {[Op.like]: generalTerm}},
            {tag: {[Op.like]: generalTerm}}
          ]
        }
      })
    }
  }
});


module.exports = router;
