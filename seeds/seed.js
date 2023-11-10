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

seedDatabase();
