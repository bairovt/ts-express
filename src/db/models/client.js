'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    info: DataTypes.TEXT,
    created_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Client.associate = function (models) {
    Client.belongsTo(models.User, {
      foreignKey: 'created_user_id',
      as: 'createdUser',
    })
  };
  return Client;
};