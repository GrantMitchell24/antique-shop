const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Photo extends Model {}

Photo.init( {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    url_link: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id',
      },
    },
  },
 {
   sequelize,
   imestamps: false,
   reezeTableName: true,
   underscored: true,
   modelName: 'photo',
 }
  
);

module.exports = Photo; 