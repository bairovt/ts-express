'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OrderProducts', {
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Orders',
          key: 'id'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: { type: Sequelize.INTEGER },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      return queryInterface.addConstraint('OrderProducts', ['order_id', 'product_id'],
        {
          type: 'unique',
          name: 'OrderProducts_order_id_product_id_compositeIndex',
        }
      )
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('OrderProducts');
  }
};