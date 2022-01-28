"use strict";

var mongoose = require("mongoose");

var _require = require("nodemon/lib/config"),
    required = _require.required;

var OccupationSchema = new mongoose.Schema({
  salle: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});
var Occupation = mongoose.model("Occupation", OccupationSchema);
module.exports = Occupation;