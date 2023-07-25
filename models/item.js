'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    option_id: {
      type: Sequelize.BIGINT
    },
    price: {
      type: Sequelize.BIGINT
    },
    type: {
      allowNull: false,
      type: Sequelize.ENUM("coffee", "juice", "food"),
      defaultValue: 'coffee',
    },
    amount: {
      type: Sequelize.BIGINT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};