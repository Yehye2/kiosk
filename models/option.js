const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Option extends Model {
  static associate(models) {
    // Define association with Item model
    Option.hasMany(models.item, { foreignKey: 'option_id', as: 'Options' });
  }
}
Option.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  extra_price: {
    type: DataTypes.BIGINT
  },
  shot_price: {
    type: DataTypes.BIGINT
  },
  hot: {
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
  },
}, {
  sequelize, // sequelize 객체를 올바르게 넘겨줍니다.
  modelName: 'Option',
});

module.exports = Option;