const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class order_customer extends Model {
  static associate(models) {
    // Define association with order_time model using item_id
    order_customer.hasMany(models.item_order_customer, { foreignKey: 'order_customer_id', as: 'item_order_customers' });
  }
}

order_customer.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  state: {
    type: DataTypes.BOOLEAN
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'order_customer',
});
module.exports = order_customer;