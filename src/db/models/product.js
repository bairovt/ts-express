'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    info: DataTypes.TEXT,
    unit: DataTypes.STRING(20),
    created_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Product.associate = function (models) {
    Product.belongsTo(models.User, {
      foreignKey: 'created_user_id',
      as: 'creator',
    })
  };
  return Product;
};