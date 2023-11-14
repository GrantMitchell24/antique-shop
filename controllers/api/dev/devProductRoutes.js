const router = require('express').Router();
const { User, Category, Product,  Photo } = require('../../../models');

router.get('/', async (req, res) => {
    // Find all Product records and include other model data
    try {
        const data = await Product.findAll({
            attributes: ['title', 'description','price'],
            include: [
                { model: Category, attributes: ['title']},
                { model: Photo, attributes: ['url_link']}
            ]
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// route = http://localhost:3001/api/dev/product/:id
router.get('/:id', async (req, res) => {
    // Find Product record by ID and include other model data
    try {
        const data = await Product.findByPk(req.params.id, {
            include: [{ model: Category }]
        });
        // Return an error if record not found
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.id + ' not found.' });
            return;
        }
        res.status(200).json(data);
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
        if(data[0] === 0) {
            res.status(400).json({ message: 'Record ' + req.params.id + ' is not found or updated.' });
            return;
        }
        res.status(200).json({ message: 'Record ' + req.params.id + ' updated.' , updated_to: req.body  });
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