'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
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
