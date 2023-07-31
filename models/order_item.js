'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class order_item extends Model {
  static associate(models) {
    // Define association with Item model
    order_item.belongsTo(models.Item, { foreignKey: 'item_id', as: 'item' });
  }
}

order_item.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  item_id: {
    type: DataTypes.BIGINT
  },
  amount: {
    type: DataTypes.BIGINT
  },
  state: {
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
  modelName: 'order_item',
});

module.exports = order_item;