const router = require('express').Router();
const { User, Category, Product, Photo } = require('../../../models');

router.get('/', async (req, res) => {
    try {
        // Find all records and include other model data
        const data = await Product.findAll({
            attributes: ['id','title', 'description', 'price'],
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
        res.status(200).json(products);

    } catch (err) {
        res.status(500).json(err);
    }
});

// route = http://localhost:3001/api/dev/product/:id
router.get('/:id', async (req, res) => {
    
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
        res.status(200).json(product);

    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/', async (req, res) => {
    // create a new Product
    try {
        const data = await Product.create(req.body);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.put('/:id', async (req, res) => {
    // update a Product by its `id` value
    try {
        const data = await Product.update(req.body, {
            where: { id: req.params.id }
        });
        // Return an error if data not found
        if (data[0] === 0) {
            res.status(400).json({ message: 'Record ' + req.params.id + ' is not found or updated.' });
            return;
        }
        res.status(200).json({ message: 'Record ' + req.params.id + ' updated.', updated_to: req.body });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete('/:id', async (req, res) => {
    // delete a Product by its `id` value
    try {
        const data = await Product.destroy({
            where: { id: req.params.id }
        });
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.id + ' not found.' });
            return;
        }
        res.status(200).json({ message: 'Record ' + req.params.id + ' is deleted.' });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;