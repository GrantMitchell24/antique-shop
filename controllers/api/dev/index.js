const router = require('express').Router();

const devUserRoutes = require('./devUserRoutes');
const devCategoryRoutes = require('./devCategoryRoutes');
const devProductRoutes = require('./devProductRoutes');
const devPhotoRoutes = require('./devPhotoRoutes');

router.use('/users', devUserRoutes);
router.use('/categories', devCategoryRoutes);
router.use('/products', devProductRoutes);
router.use('/photos', devPhotoRoutes);

module.exports = router;