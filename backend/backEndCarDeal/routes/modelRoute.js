const express = require('express');
const router = express.Router();
const Model = require('../models/modelModel');

// GET all models
router.get('/', async (req, res) => {
    try {
        const models = await Model.find();
        res.json(models);
    } catch (err) {
        console.error('Error fetching models:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET model by ID
router.get('/:id', async (req, res) => {
    try {
        const model = await Model.findById(req.params.id);
        if (!model) {
            return res.status(404).json({ message: 'Model not found' });
        }
        res.json(model);
    } catch (err) {
        console.error('Error fetching model:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST new model
router.post('/', async (req, res) => {
    try {
        const { modelname, manufacturername } = req.body;
    
        const newModel = new Model({ modelname, manufacturername });
        await newModel.save();
        res.status(201).json(newModel);
    } catch (err) {
        console.error('Error adding model:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE model by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedModel = await Model.findByIdAndDelete(req.params.id);
        if (!deletedModel) {
            return res.status(404).json({ message: 'Model not found' });
        }
        res.json(deletedModel);
    } catch (err) {
        console.error('Error deleting model:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
