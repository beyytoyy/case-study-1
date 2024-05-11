        const express = require('express');
        const router = express.Router();
        const multer = require('multer');
        const Vehicle = require('../models/vehicleModel')

        router.get('/best-seller', async (req, res) => {
            try {
                // Aggregate query to find the best-selling manufacturer
                const bestSellers = await Vehicle.aggregate([
                    {
                        $match: { sold: true } // Only consider sold vehicles
                    },
                    {
                        $group: {
                            _id: "$manufacturername",
                            totalSales: { $sum: 1 }
                        }
                    },
                    {
                        $sort: { totalSales: -1 }
                    }
                ]);
                
                res.json(bestSellers);
            } catch (error) {
                console.error('Error fetching best-selling manufacturers:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });        
          
        // Set up multer storage
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
            cb(null, 'public/images'); // Set destination folder
            },
            filename: function(req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname); // Set filename with current timestamp and original filename to avoid overwriting
            }
        });

        // Create multer instance with storage configuration
        const upload = multer({ storage: storage });

        router.post('/upload-image', upload.single('image'), async (req, res) => {
            try {
                // Extract the vehicle ID from the request body
                const vehicleId = req.body.vehicleId;

                // Find the corresponding vehicle in the database
                const vehicle = await Vehicle.findById(vehicleId);

                // Check if the vehicle exists
                if (!vehicle) {
                    return res.status(404).json({ error: 'Vehicle not found' });
                }

                // Update the vehicle with the image filename
                vehicle.image = req.file.filename;

                // Save the updated vehicle to the database
                await vehicle.save();

                // Respond with success message
                res.status(200).json({ message: 'Image uploaded and associated with the vehicle successfully' });
            } catch (error) {
                // Error handling
                console.error('Error uploading image:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        // GET all vehicles
        router.get('/', async (req, res) => {
            try {
                const page = req.query.page || 1;
                const limit = req.query.limit || 10;
                const skip = (page - 1) * limit;

                const vehicles = await Vehicle.find();
                const totalVehicles = await Vehicle.countDocuments();

                const totalPages = Math.ceil(totalVehicles / limit);

                const paginatedVehicles = await Vehicle.find()
                    .skip(skip)
                    .limit(limit)
                    .sort({ createdAt: -1 });

                res.json({
                    totalPages,
                    totalVehicles,
                    vehicles: paginatedVehicles
                });
            } catch (err) {
                console.error('Error fetching vehicles:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        // GET vehicle by ID
        router.get('/:id', async (req, res) => {
            try {
                const vehicle = await Vehicle.findById(req.params.id);
                if (!vehicle) {
                    return res.status(404).json({ message: 'Vehicle not found' });
                }
                res.json(vehicle);
            } catch (err) {
                console.error('Error fetching vehicle:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        // POST new vehicle
        router.post('/', async (req, res) => {
            try {
                const {
                    modelname,
                    manufacturername,
                    category,
                    originalPrice,
                    sellingPrice,
                    gearType,
                    mileAge,
                    sixEngine,
                    sevenEngine,
                    date,
                    doors,
                    year,
                    insuranceID,
                    seats,
                    tank,
                    color,
                    soldOn,
                    sold,
                    image // Assuming the filename is provided in the request body
                } = req.body;

                const newVehicle = new Vehicle({
                    modelname,
                    manufacturername,
                    category,
                    originalPrice,
                    sellingPrice,
                    gearType,
                    mileAge,
                    sixEngine,
                    sevenEngine,
                    date,
                    doors,
                    year,
                    insuranceID,
                    seats,
                    tank,
                    color,
                    soldOn,
                    sold,
                    image // Save only the filename
                });

                await newVehicle.save();
                res.status(201).json(newVehicle);
            } catch (err) {
                console.error('Error adding vehicle:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        router.put('/:id', async (req, res) => {
            try {
                const vehicleID = req.params.id;
                const updatedVehicleData = req.body;

                // Update vehicle data
                await Vehicle.findByIdAndUpdate(vehicleID, updatedVehicleData);

                res.status(200).json({ message: 'Vehicle data updated successfully' });
            } catch (error) {
                console.error('Error updating vehicle data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        // DELETE vehicle by ID
        router.delete('/:id', async (req, res) => {
            try {
                const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
                if (!deletedVehicle) {
                    return res.status(404).json({ message: 'Vehicle not found' });
                }
                res.json(deletedVehicle);
            } catch (err) {
                console.error('Error deleting vehicle:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });        

        module.exports = router;
