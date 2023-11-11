const sequelize = require('../config/connection');
const { User, Product, Category, Photo } = require('../models');

const userData = require('./userData.json');
const productData = require("./productData.json");
const categoryData = require("./categoryData.json");
const photoData = require("./photoData.json");
 

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Product.bulkCreate(productData);

  await Category.bulkCreate(categoryData);

  await Photo.bulkCreate(photoData);
  
  process.exit(0);
};



seedDatabase();
