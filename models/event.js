'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    time: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
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
