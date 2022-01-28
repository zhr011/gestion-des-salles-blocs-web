const mongoose = require("mongoose");
const SalleSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    bloc: {
        type: String,
        required: true,
    },
    qrcode: {
        type: String,
        required: true,
    }


});

const Salle = mongoose.model("Salle", SalleSchema);

module.exports = Salle;