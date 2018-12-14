'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    name: DataTypes.STRING(45),
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
  });

  Event.associate = function(models) {
    models.Tag.belongsToMany(models.Event, {
      through: 'Event_Tag',
      as: 'tags',
      foreignKey: 'tagId'
    });

    models.Venue.hasMany(models.Event);
  };

  return Event;
};
