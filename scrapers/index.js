var models = require('../models');
var fs = require('fs');

var events = JSON.parse(fs.readFileSync('./data/destinationmissoula_org.json', 'utf8'));

for (var i in events) {
  var event = events[i];
  var tags = event.Tags;
  for (var j in tags) {
    var tag = tags[j];
    var tag_query = models.Tag.findOrCreate({
      where: {
        name: tag.name
      },
      transaction: t
    })
    .then()
  }
}
