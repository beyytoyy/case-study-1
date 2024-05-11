const mongoose = require("mongoose");

const vehicleModelSchema = new mongoose.Schema({
    // Define your existing vehicle properties
    modelname: { type: String },
    manufacturername: { type: String },
    category: { type: String },
    originalPrice: { type: String },
    sellingPrice: { type: String},
    gearType: { type: String},
    mileAge: { type: String },
    sixEngine: { type: String},
    sevenEngine: {type: String},
    date: { type: String },
    doors: { type: String },
    year: { type: String  },
    insuranceID: { type: String },
    seats: { type: String },
    tank: { type: String },
    color: { type: String },
    image: {type: String },
    soldOn: {type: String },
    sold: {type: Boolean, default: false},

    // Reference to the customer who purchased the vehicle
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
});

module.exports = mongoose.model("Vehicle", vehicleModelSchema);
