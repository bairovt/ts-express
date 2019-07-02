'use strict';
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    pass_hash: DataTypes.STRING,
    salt: DataTypes.STRING,
    secret: DataTypes.STRING,
  }, {});
  User.associate = function (models) {
    // associations can be defined here
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