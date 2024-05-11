const mongoose = require("mongoose");

const modelModelSchema = new mongoose.Schema({
    modelname: { type: String, required: true },
    manufacturername: { type: String, required: true }
});

module.exports = mongoose.model("Model", modelModelSchema);
