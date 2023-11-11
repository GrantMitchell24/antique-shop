const router = require('express').Router();

const devCategoryRoutes = require('./devCategoryRoutes');
const devProductRoutes = require('./devProductRoutes');


router.use('/categories', devCategoryRoutes);
router.use('/products', devProductRoutes);

module.exports = router;