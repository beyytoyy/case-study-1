const mongoose = require("mongoose")

const customerModelSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String },
    sellingPrice: { type: String, required: true  },
    mobile: { type: String, required: true  },
    paymentMethod: { type: String  },
    warrantStart: { type: String, required: true  },
    warrantEnd: { type: String },
})

module.exports = mongoose.model("Customer", customerModelSchema);