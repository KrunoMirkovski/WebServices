const mongoose = require("mongoose");

const oglasiSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["avtomobili", "nedviznini", "telefoni", "velosipedi"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Oglas = mongoose.model("Entity", oglasiSchema);

module.exports = Oglas;
