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
            attributes: ['id', 'title', 'description', 'price'],
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
        const serialData = data.get({ plain: true });
        const product = { ...serialData, url_link: serialData.photos[0].url_link };

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
        // console logged req.session.cart for debugging
        console.log("This is req.session.cart: ");
        console.log(req.session.cart);

        // If no cart, render an empty cart
        if (!req.session.cart) {
            res.render('cart', {
                cart: false,
                logged_in: req.session.logged_in
            });
            return;
        }

        const cartProductIDs = req.session.cart;

        // Find all records and include other model data
        const data = await Product.findAll({
            attributes: ['id', 'title', 'description', 'price'],
            include: [
                { model: Category, attributes: ['title'] },
                { model: Photo, attributes: ['url_link'] }
            ],
            where: {
                id: cartProductIDs
            }
        });

        // // calculate total price for all products in the cart
        // const result = await Product.findAll({
        //     attributes: [
        //         [sequelize.fn('SUM', sequelize.col('price')), 'totalPrice'],
        //     ],
        //     where: {
        //         id: cartProductIDs
        //     }
        // });

        const totalPrice = await Product.sum('price', {
            where: {
                id: cartProductIDs
            }
        });
        console.log(totalPrice);

        // console.log(result);

        // Serialize data so the template can read it
        const serialData = data.map((item) => item.get({ plain: true }));
        const products = serialData.map(product => ({
            ...product,
            url_link: product.photos[0].url_link
        }));

        // Pass serialized data and session flag into template
        // res.status(200).json(products);
        res.render('cart', {
            cart: true,
            totalPrice: totalPrice,
            products: products,
            logged_in: req.session.logged_in
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