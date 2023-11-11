const router = require('express').Router();
const categoryRoutes = require('./dev.category.routes.js');
const productRoutes = require('./dev.product.routes.js');
const photoRoutes = require('./dev.photo.routes.js');
const userRoutes = require('./dev.user.routes.js');

// API Path: /api/dev/..
// router.use('/categories', categoryRoutes);
// router.use('/products', productRoutes);
// router.use('/photos', photoRoutes);
router.use('/users', userRoutes);

module.exports = router;
