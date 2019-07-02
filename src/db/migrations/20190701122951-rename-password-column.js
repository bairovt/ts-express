'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'password', 'pass_hash');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'pass_hash', 'password');
  }
};
