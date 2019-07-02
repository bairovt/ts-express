'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: 'Users_email_unique_constraint'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Users', 'Users_email_unique_constraint');
  }
};
