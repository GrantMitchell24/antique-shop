const User = require('./User');
const Category = require("./Category");
const Product = require("./Product");
const Photo = require("./Photo");

Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'SET NULL'
});

Product.belongsTo(Category, {
    foreignKey: 'category_id',
});

Product.hasMany(Photo, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
});

Photo.belongsTo(Product, {
    foreignKey: 'product_id',
});

module.exports = { User, Category, Product,  Photo };