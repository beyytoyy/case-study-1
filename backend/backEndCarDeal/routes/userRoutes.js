const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// POST Admin login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await User.findOne({ email });

        if (user) {
            // Compare passwords
            if (password === user.password) { // Note: This assumes passwords are stored as plaintext, which is not recommended for production
                if (user.status !== 'Active') {
                    user.status = 'Active';
                    await user.save();
                }
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(401).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const users = await User.find().skip(skip).limit(limit);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log(req.body); 
        const { email, password, firstname, lastname, mobile, position, gender, birth, address, userType, status } = req.body;

        const user = new User({
            email,
            password,
            firstname,
            lastname,
            mobile,
            position,
            gender,
            birth,
            address,
            userType,
            status
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.json(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Error: ' + err.message);
    }
});

router.delete('/:id', async(req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id) 
        if(!user){
            return res.status(404).send('User not found')
        }
        res.json(user)
    }catch(err){
        res.status(500).send('Error ' + err)
    }
})

router.post('/logout', async (req, res) => {
    try {
        // Get the user ID from the request body
        const { userId } = req.body;

        // Find the user by ID and update their status to 'Inactive'
        const user = await User.findOneAndUpdate(
            { _id: userId, status: 'Active' }, // Find the user with the specified ID and 'Active' status
            { status: 'Inactive' }, // Set the user's status to 'Inactive'
            { new: true } // Return the updated user document
        );

        if (user) {
            res.status(200).json({ message: 'Logout successful' });
        } else {
            res.status(404).json({ message: 'User not found or not active' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;