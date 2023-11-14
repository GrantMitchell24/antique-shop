const router = require('express').Router();
const { User, Category, Product,  Photo } = require('../models');


//API route: http://localhost:3001/
router.get('/', async (req, res) => {

    try {
        res.render('homepage');
    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;