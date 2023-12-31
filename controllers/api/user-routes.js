const router = require('express').Router();
const { User } = require('../../models');

const nodemailer = require('nodemailer');
require('dotenv').config();

// User Signup
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


// User Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});


// User logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


// User Cart
router.post('/cart', async (req, res) => {
    try {

        console.log(req.body.id);
        req.session.save(() => {
            if (!req.session.cart) {
                req.session.cart = req.body.id;
            } else {
                // If doesn't already exist in cart, add the product
                if (!req.session.cart.includes(req.body.id)) {
                    req.session.cart = [...req.session?.cart, req.body.id];
                }
            }

            res.status(200).json({ status: "success", message: req.session.cart });
        });


    } catch (err) {
        res.status(400).json(err);
    }
});


// User clicked Email Invoice
router.post('/invoice', async (req, res) => {
    try {

        const userData = await User.findOne({ where: { id: req.session.user_id } });
        console.log(userData.email);

        // Create a transporter with your Gmail account
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_SHOP_OWNER,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_SHOP_OWNER,
            to: userData.email,
            subject: 'Hello from the Antique Shop! - Automated Email Invoice Service',
            text: 'This is a test email sent using Nodemailer. Thanks for your interest in the Antique Shop. Our invoicing system is currently being worked on.',
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json({ status: "success", message: req.body });

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
