const mongoose = require("mongoose");

const userModelSchema = new mongoose.Schema({
    email: { type: String},
    password: { type: String},
    firstname: { type: String},
    lastname: { type: String,},
    mobile: { type: String},
    position: { type: String},
    gender: { type: String },
    birth: { type: Date },
    address: { type: String },
    userType: { type: String, default: 'Employee' },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Inactive' } // Added status field
});

module.exports = mongoose.model("User", userModelSchema);
