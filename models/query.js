'use strict';
module.exports = (sequelize, DataTypes) => {
  var Query = sequelize.define('Query', {
    generalTerm: DataTypes.STRING,
  });

  Query.associate = function(models) {
  };

  return Query;
};
