"use strict";

var mongoose = require("mongoose");

var SalleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  bloc: {
    type: String,
    required: true
  },
  qrcode: {
    type: String,
    required: true
  }
});
var Salle = mongoose.model("Salle", SalleSchema);
module.exports = Salle;