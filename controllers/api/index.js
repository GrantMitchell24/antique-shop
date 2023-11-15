const router = require('express').Router();
require('dotenv').config();

const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

// For Development API calls
if(process.env.NODE_ENV === 'dev'){
    const devRoutes = require('./dev');
    router.use('/dev', devRoutes);
}

module.exports = router;
