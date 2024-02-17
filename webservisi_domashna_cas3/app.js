//? DA SE KE KREIRA WEB SERVIS ILI REST API
//? DA SE KREIRA OGLAS KAKO REKLAMA5
//? I DA SE KREIRA AFTENTIKACIJA (korisnici - logiranje)
//? DA IMAME KOLEKCIJA SO AVTOMOBILI, VELOSIPEDI, NEDVIZNINI, TELEFONI
//? SITE KORISNICI BEZ RAZLIKA NA LOGIRANJE DA IMAAT PRISTAP DO SITE KOLEKCII
//? SAMO LOGIRANI KORISNI DA MOZE DA KREIRAAT BRISHAT I UPDEJTIRAAT DOKUMENTI VO KOLKEKCIITE

const express = require("express");
const db = require("./pkg/db/index");
const jwt = require("express-jwt"); //zastita na urls za lugjeto sto ne se najaveni

//* Gi povikuvame handlerite
const authHandler = require("./handlers/authHandler");
const oglasHandler = require("./handlers/oglasHandler");

const app = express();

//* Povikuvame middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* izvrsuvanje na init funkcijata so koja funkcija se konektirame so data baza
db.init();

//* Protektiranje na ruti; koristime middelware sto ni ovozmuzva da gi protektirame rutite
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

app.get("/oglas", oglasHandler.getAllOglasi);
app.get("/oglas/:type", oglasHandler.getAllOglasiByType);
app.post("/oglas", oglasHandler.createOglas);
app.patch("/oglas/:id", oglasHandler.updateOglas);
app.delete("/oglas/:id", oglasHandler.deleteOglas);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start server");
  }
  console.log(`Server started successfully on port ${process.env.PORT}`);
});
