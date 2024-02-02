const mongoose = require("mongoose");

//! Kreirame blueprint za nasata databaza
const movieShema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Mora da ima naslov"],
  },
  year: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 3,
  },
  metascore: {
    type: Number,
  },
});

//! Baza na shemata sto ja definirame
const Movie = mongoose.model("Movie", movieShema);

module.exports = Movie;
