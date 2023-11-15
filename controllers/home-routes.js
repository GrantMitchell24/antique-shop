const router = require('express').Router();
const { User, Category, Product, Photo } = require('../models');
const withAuth = require('../utils/auth');


//API route: http://localhost:3001/
router.get('/', async (req, res) => {

    try {

        // Find all records and include other model data
        const data = await Product.findAll({
            attributes: ['id', 'title', 'description', 'price'],
            include: [
                { model: Category, attributes: ['title'] },
                { model: Photo, attributes: ['url_link'] }
            ]
        });

        // Serialize data so the template can read it
        const serialData = data.map((item) => item.get({ plain: true }));
        const products = serialData.map(product => ({
            ...product,
            url_link: product.photos[0].url_link
        }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            products: products,
            logged_in: req.session.logged_in
        });


    } catch (err) {
        res.status(500).json(err);
    }

});

// route = http://localhost:3001/product/:id
router.get('/product/:id', async (req, res) => {
    
    try {
        // Find record by id and include other model data
        const data = await Product.findByPk(req.params.id, {
            attributes: ['id','title', 'description', 'price'],
            include: [
                { model: Category, attributes: ['title'] },
                { model: Photo, attributes: ['url_link'] }
            ]
        });
        // Return an error if record not found
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.id + ' not found.' });
            return;
        }

        // Serialize data so the template can read it
        const serialData = data.get({plain:true});
        const product = {...serialData, url_link: serialData.photos[0].url_link};
        
        // Pass serialized data and session flag into template
        res.render('product-page', {
            ...product,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});


// Use withAuth middleware to prevent access to route
router.get('/cart', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            // include: [{ model: Product }],
        });

        const user = userData.get({ plain: true });
        console.log(user);

        res.render('cart', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});



module.exports = router;