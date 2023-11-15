const router = require('express').Router();
const { User, Category, Product,  Photo } = require('../../models');


//API route: http://localhost:3001/
router.get('/', async (req, res) => {

    try {
        // Get all RECORDS and JOIN with other data
        const data = await Product.findAll({
            attributes: ['title', 'description','price'],
            include: [
                { model: Category, attributes: ['title']},
                { model: Photo, attributes: ['url_link']}
            ]
        });

        // Serialize data so the template can read it
        const products = data.map((item) => item.get({ plain: true }));
        const products2 = products.map(product => ({
            ...product,
            url_link: product.photos[0].url_link
        }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            products: products2,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;