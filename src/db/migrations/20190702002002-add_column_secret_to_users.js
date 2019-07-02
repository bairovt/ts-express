'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'secret', Sequelize.STRING(255));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'secret', Sequelize.STRING);
  }
};
