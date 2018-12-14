'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
  });

  Tag.associate = function(models) {
    models.Event.belongsToMany(models.Tag, {
      through: 'Event_Tag',
      as: 'events',
      foreignKey: 'eventId'
    });
  };

  return Tag;
};
