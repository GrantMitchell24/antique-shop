const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Photo extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Photo.init( {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
    },
    url_link: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
  },
 {
   hooks: {
     beforeCreate: async (newUserData) => {
       newUserData.password = await bcrypt.hash(newUserData.password, 10);
       return newUserData;
    },
  },
   sequelize,
   imestamps: false,
   reezeTableName: true,
   underscored: true,
   modelName: 'photo',
 }
  
);

module.exports = Photo; 