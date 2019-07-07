'use strict';

const allowedStatuses = ['CREATED', 'DONE'];

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    delivery_date: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'CREATED',
      validate: {
        isIn: [allowedStatuses]
      }
    },
    created_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      foreignKey: 'created_user_id',
      as: 'creator'
    });
    Order.belongsTo(models.Client, {
      foreignKey: 'client_id',
      as: 'client'
    });
    Order.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: 'order_id'
    });
  };
  return Order;
};