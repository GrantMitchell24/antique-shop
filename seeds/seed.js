const sequelize = require('../config/connection');
const { User, Product, Category, Photo } = require('../models');

const userData = require('./userData.json');
// Follow the duplication for photo, product and category. 
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
// Duplicate line 9 without individual hooks for photo, product and category. 
  process.exit(0);
};

const productData = require("./productData.json");

await Product.bulkCreate(productData, {
  returning: true, 
});

const categoryData = require("./categoryData.json");

await Category.bulkCreate(categoryData, {
  returning: true, 
});

const photoData = require("./photoData.json");

await Photo.bulkCreate(photoData, {
  returning: true, 
});

seedDatabase();
