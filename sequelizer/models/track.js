'use strict';
module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define('track', {
    name: DataTypes.STRING,
    album_id: DataTypes.INTEGER,
    duration: DataTypes.INTEGER
  }, {});
  track.associate = function(models) {
    // associations can be defined here
  };
  return track;
};