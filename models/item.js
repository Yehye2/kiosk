'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Item extends Model {
  static associate(models) {
    // Define association with order_time model using item_id
    Item.hasMany(models.order_item, { foreignKey: 'item_id', as: 'order_items' });
    Item.belongsTo(models.Option, { foreignKey: 'option_id', as: 'Options' });
  }
}

Item.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  option_id: {
    type: DataTypes.BIGINT
  },
  price: {
    type: DataTypes.BIGINT
  },
  type: {
    allowNull: false,
    type: DataTypes.ENUM('coffee', 'juice', 'food'),
    defaultValue: 'coffee',
  },
  amount: {
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
  modelName: 'Item',
});

module.exports = Item;