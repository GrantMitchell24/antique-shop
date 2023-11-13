const sequelize = require('../config/connection');
const { User, Product, Category, Photo } = require('../models');

const userData = require('./userData.json');
const categoryData = require("./categoryData.json");
const productData = require("./productData.json");
const photoData = require("./photoData.json");
 

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Category.bulkCreate(categoryData);
  
  await Product.bulkCreate(productData);

  await Photo.bulkCreate(photoData);
  
  process.exit(0);
};



seedDatabase();
