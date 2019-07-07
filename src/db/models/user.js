'use strict';
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isEmail: true }
    },
    pass_hash: DataTypes.STRING,
    salt: DataTypes.STRING,
    secret: DataTypes.STRING,
    role: {
      type: DataTypes.STRING(20),
      validate: {
        isIn: [['admin']]
      }
    },
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Client, {
      sourceKey: 'id',
      foreignKey: 'created_user_id',
      as: 'clients'
    });
    User.hasMany(models.Product, {
      sourceKey: 'id',
      foreignKey: 'created_user_id',
      as: 'products'
    });
    User.hasMany(models.Order, {
      sourceKey: 'id',
      foreignKey: 'created_user_id',
      as: 'orders'
    });
  };
  User.hashPassword = function (salt, password) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 1000, 32, 'sha256', function (err, hash) {
        if (err) {
          return reject(err);
        }
        return resolve(hash.toString("base64"));
      })
    })
  }
  User.prototype.checkPassword = async function (password) {
    const hash = await User.hashPassword(this.salt, password)
    return this.pass_hash === hash
  };
  return User;
};