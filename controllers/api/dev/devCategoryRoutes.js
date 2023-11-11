const router = require('express').Router();
const Category = require('../../../models/Category');

router.get('/', async (req, res) => {
    try {
        const data = await Category.findAll({
            // include: [{ model: Post }]
            // include: [{ model: Post }, {model: Comment, through: Post, as:'comment'}]
            // include: {model: Comment, include: Post}
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;