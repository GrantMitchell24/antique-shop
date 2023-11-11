const router = require('express').Router();
require('dotenv').config();

const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

// For Development API calls
if(process.env.NODE_ENV === 'dev'){
    const devRoutes = require('./dev');
    router.use('/dev', devRoutes);
    console.log("made it here");
}

module.exports = router;
