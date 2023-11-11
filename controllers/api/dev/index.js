const router = require('express').Router();

const devCategoryRoutes = require('./devCategoryRoutes');
router.use('/categories', devCategoryRoutes);

module.exports = router;