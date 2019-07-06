'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER
    }
  });
  OrderProduct.associate = function (models) {
    OrderProduct.belongsTo(models.Order, {
      foreignKey: 'order_id'
    });
    OrderProduct.belongsTo(models.Product, {
      foreignKey: 'product_id'
    });
  };
  return OrderProduct;
};