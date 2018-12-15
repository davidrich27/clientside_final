'use strict';
module.exports = (sequelize, DataTypes) => {
  var Venue = sequelize.define('Venue', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.TEXT,

    // Location
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT,
  });

  Venue.associate = function(models) {
  };

  return Venue;
};
