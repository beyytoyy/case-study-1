const express = require('express');
const router = express.Router();
const Manufacturer = require('../models/manufacturerModel');

// GET all manufacturers
router.get('/', async (req, res) => {
    try {
        const manufacturers = await Manufacturer.find();
        res.json(manufacturers);
    } catch (err) {
        console.error('Error fetching manufacturers:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET manufacturer by ID
router.get('/:id', async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findById(req.params.id);
        if (!manufacturer) {
            return res.status(404).json({ message: 'Manufacturer not found' });
        }
        res.json(manufacturer);
    } catch (err) {
        console.error('Error fetching manufacturer:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST new manufacturer
router.post('/', async (req, res) => {
    try {
        const { manufacturer } = req.body;

        const newManufacturer = new Manufacturer({ manufacturer });
        await newManufacturer.save();
        res.status(201).json(newManufacturer);
    } catch (err) {
        console.error('Error adding manufacturer:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE manufacturer by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedManufacturer = await Manufacturer.findByIdAndDelete(req.params.id);
        if (!deletedManufacturer) {
            return res.status(404).json({ message: 'Manufacturer not found' });
        }
        res.json(deletedManufacturer);
    } catch (err) {
        console.error('Error deleting manufacturer:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;