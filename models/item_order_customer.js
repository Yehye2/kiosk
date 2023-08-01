'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class item_order_customer extends Model {
  static associate(models) {
    // Define association with order_time model using item_id
    // Define association with Item model using item_id
    item_order_customer.belongsTo(models.Item, { foreignKey: 'item_id', as: 'item' });

    // Define association with Option model using option_id
    item_order_customer.belongsTo(models.Option, { foreignKey: 'option_id', as: 'option' });

    // Define association with order_customer model using order_customer_id
    item_order_customer.belongsTo(models.order_customer, { foreignKey: 'order_customer_id', as: 'order_customer' });
  }
}

item_order_customer.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  item_id: {
    type: DataTypes.BIGINT
  },
  order_customer_id: {
    type: DataTypes.BIGINT
  },
  amount: {
    type: DataTypes.BIGINT
  },
  option_id: {
    type: DataTypes.BIGINT
  },
  price: {
    type: DataTypes.BIGINT
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
  modelName: 'item_order_customer',
});
module.exports = item_order_customer;