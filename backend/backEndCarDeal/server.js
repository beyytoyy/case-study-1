const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const userRouter = require('./routes/userRoutes');
const manufacturerRouter = require('./routes/manufacturerRoute')
const modelRouter = require('./routes/modelRoute')
const vehicleRouter = require('./routes/vehicleRoutes')
const customerRouter = require('./routes/customerRoute')
const path = require('path');

const url = 'mongodb://localhost/carDeal';
const app = express();

app.use('/images', express.static(path.join(__dirname, 'public/images')));

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on('open', function() {
    console.log('connected...');
});

app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use('/users', userRouter);
app.use('/manufacturers', manufacturerRouter)
app.use('/models', modelRouter)
app.use('/vehicles', vehicleRouter)
app.use('/customers', customerRouter)


app.listen(9001, () => {
    console.log('Server started');
});
