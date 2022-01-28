const mongoose = require("mongoose");

const BlocSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const Bloc = mongoose.model("Bloc", BlocSchema);

module.exports = Bloc;