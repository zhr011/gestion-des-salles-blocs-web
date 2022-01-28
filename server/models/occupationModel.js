const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const OccupationSchema = new mongoose.Schema({
    salle: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    }
});

const Occupation = mongoose.model("Occupation", OccupationSchema);

module.exports = Occupation;