const express = require('express');
const router = express.Router();
const Customer = require('../models/customerModel');
const Vehicle = require('../models/vehicleModel')

router.get('/sales-data', async (req, res) => {
    try {
        // Fetch the necessary data from the database for customers
        const customers = await Customer.find();

        if (customers.length === 0) {
            return res.status(404).json({ message: 'No customers found' });
        }   

        // Process the data to get the required format for the chart
        const chartData = {
            labels: [],
            datasets: [{
                label: 'Sales for month',
                data: []
            }]
        };

        // Extract warrant start date and selling price for each customer
        customers.forEach(customer => {
            chartData.labels.push(customer.warrantStart); // Add warrant start date to labels
            chartData.datasets[0].data.push(customer.sellingPrice); // Add selling price to data
        });

        // Send the processed data to the frontend
        res.json(chartData);
    } catch (error) {
        console.error('Error fetching chart data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const customers = await Customer.find().skip(skip).limit(limit);
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customers = await Customer.findById(req.params.id);
        if (!customers) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log(req.body); 
        const { firstname, lastname, email, sellingPrice, mobile, paymentMethod, warrantStart, warrantEnd } = req.body;
        const customers = new Customer({
            firstname,
            lastname,
            email,
            sellingPrice,
            mobile,
            paymentMethod,
            warrantStart,
            warrantEnd
        });

        const newCustomer = await customers.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async(req,res) => {
    try{
        const customers = await Customer.findByIdAndDelete(req.params.id) 
        if(!customers){
            return res.status(404).send('User not found')
        }
        res.json(customers)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
})


module.exports = router;