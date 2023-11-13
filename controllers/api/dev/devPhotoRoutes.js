const router = require('express').Router();
const { User, Category, Product, Photo } = require('../../../models');
const { sync } = require('../../../models/User');

router.get('/', async (req, res) => {
    try {
        const data = await Photo.findAll({

        })
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
})
// route = http://localhost:3001/api/dev/photos/:id
router.get('/:id', async (req, res) => {
    try {
        const data = await Photo.findByPk(req.params.id, {
        })
        if (!data) {
            res.status(404).json({ message: 'Record' + req.params.id + 'not found.' });
            return;
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', async (req, res) => {
    try {
        const data = await Photo.create(req.body);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const data = await Photo.update(req.body, {
            where: { id: req.params.id }
        });

        if (data[0] === 0) {
            res.status(400).json({ massage: 'Record' + req.params.id + 'is not found or updated' }) // recored of photo?
            return;
        }
        res.status(200).json({ massage: 'Record' + req.params.id + ' update.', updated_to: req.body });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await Photo.destroy({
            where: { id: req.params.id }
        });
        if (!data) {
            res.status(200).json({ message: 'Record' + req.params.id + 'not found.' });
            return;
        }
        res.status(200).json({ message: 'Record' + req.params.id + 'is deleted.' });
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router; 
