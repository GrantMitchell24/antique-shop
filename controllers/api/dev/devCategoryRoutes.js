const router = require('express').Router();
const { User, Category, Product,  Photo } = require('../../../models');

router.get('/', async (req, res) => {
    try {
        const data = await Category.findAll({
            include: [{ model: Product }]
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;