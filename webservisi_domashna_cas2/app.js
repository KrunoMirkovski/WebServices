//! Gi povikuvame paketite
const express = require("express");
const db = require("./pkg/db/index");
const jwt = require("express-jwt");

//! Go povikuvame handlerot
const authHandler = require("./handlers/authHandler");
// const functionAn = require("./handlers/functionAn");

//! Ja inicijalizirame app
const app = express();

//! Povikuvame middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! izvrsuvanje na init funkcijata so koja funkcija se konektirame so data baza
db.init();

//! Protektiranje na ruti; koristime middelware sto ni ovozmuzva da gi protektirame rutite
app.use(
  jwt
    .expressjwt({
      algorithms: ["HS256"],
      secret: process.env.JWT_SECRET,
    })
    .unless({
      path: ["/api/v1/signup", "/api/v1/login"],
    })
);

app.post("/api/v1/signup", authHandler.signUp);
app.post("/api/v1/login", authHandler.logIn);

// app.get("/angelaantova", functionAn.functionA);

//? Slusame app
app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Couldn't start the service.");
  }
  console.log(`Service started successfully on port ${process.env.PORT}`);
});
