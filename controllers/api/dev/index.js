const router = require('express').Router();

const devUserRoutes = require('./devUserRoutes');
const devCategoryRoutes = require('./devCategoryRoutes');
const devProductRoutes = require('./devProductRoutes');

router.use('/users', devUserRoutes);
router.use('/categories', devCategoryRoutes);
router.use('/products', devProductRoutes);

module.exports = router;