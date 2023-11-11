const User = require('./User');
const Product = require("./Product");
const Category = require("./Category");
const Photo = require("./Photo");

// category have many products and products belong to category
// product have many photo and photo belong to product

const Product = require('./Product');
const Category = require('./Category');
const Photo = require('./Photo');

// const ProductTag = require('./ProductTag');

// Categories have many Products
Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'SET NULL'
});

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: 'category_id',
});

// Products have many Photos
Product.hasMany(Photo, {
    foreignKey: 'product_id',
    onDelete: 'SET NULL'
});

// Photo belong to Product
Photo.belongsTo(Product, {
    foreignKey: 'product_id',
});


// Products belongToMany Tags (through ProductTag)
// Product.belongsToMany(Tag, {
//     through:{
//         model: ProductTag,
//         unique: false
//     },
//     as:"tags"
// });

// Tags belongToMany Products (through ProductTag)
// Tag.belongsToMany(Product, {
//     through:{
//         model: ProductTag,
//         unique: false
//     },
//     as:"products"
// });

module.exports = { User, Product, Category, Photo };