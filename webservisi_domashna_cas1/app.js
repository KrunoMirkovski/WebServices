//! Gi povikuvame paketite
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const DB = require("./pkg/db/index");

//! Go povikuvame handlerot
const moviesHandler = require("./handlers/moviesHandler");

//! Inicijalizirame app
const app = express();

//! Povikuvame middlewares
app.set("view engine", "ejs");
app.use(express.json()); //persiranje na podatocite
app.use(express.urlencoded({ extended: true }));

//! izvrsuvanje na init funkcijata so koja se konektirame so databaza
DB.init();

//! Kreiranje na rutite
app.get("/api/movies", moviesHandler.getAllMovies);
app.post("/api/movies", moviesHandler.createMovie);
app.get("/api/movies/:id", moviesHandler.getMovie);
app.patch("/api/movies/:id", moviesHandler.updateMovie);
app.delete("/api/movies/:id", moviesHandler.deleteMovie);

//! Slusame app
app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Couldn't start the service.");
  }
  console.log(`Service started successfully on port ${process.env.PORT}`);
});
