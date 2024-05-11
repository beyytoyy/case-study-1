const mongoose = require("mongoose");

const manufacturerModelSchema = new mongoose.Schema({
    manufacturer: { type: String, required: true }
});

module.exports = mongoose.model("Manufacturer", manufacturerModelSchema);