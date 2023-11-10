const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {};

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      }
    },
    // Maybe take it out.
    // dimension: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // Color property was taken out. 
    // Below: all primary key and autoIncrement have to be false except for the id. 
    // Maybe take it out or put it in the description. 
    // weight: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    // Below: all primary key and autoIncrement have to be false except for the id. 
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }

);

module.exports = Product;

