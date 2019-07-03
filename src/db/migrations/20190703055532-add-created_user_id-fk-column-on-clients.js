'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Clients', 'created_user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Clients', 'created_user_id');
  }
};
