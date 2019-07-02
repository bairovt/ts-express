'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'salt', Sequelize.STRING(255));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'salt');

  }
};
