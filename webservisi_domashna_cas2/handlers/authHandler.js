//! Handler za avtentikacija(odnosno servis koj se bavi so avtentikacijata)
//* Prvo go zemame user modelot (userSchema) so koj ke mozeme da vrshime interakcija so databazata
const User = require("../pkg/user/userSchema");
//* za da implementirame JWT token, prvo treba da instalirame i da go povikame modulot
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//! kreirame f-ja Sign Up (vo nea kreirame korisnik i kreirame token)
exports.signUp = async (req, res) => {
  try {
    //* kako input kreirame nash objekt bez role zaradi pogolema bezbednost
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    //*generirame token; vo config.env gi zapisuvame tajnite podatoci
    const token = jwt.sign(
      //* ova vsushnost e payload delot od tokenot(prviot parametar na tokenot)
      { id: newUser._id, name: newUser.name },
      //*ova e tajnata recenica i rokot na instekuvanje na tokenot (vtoriot i tretiot parametar)
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.status(201).json({
      status: "success",
      //* ako ne e vklucen tokenot, posle registracija stranata ke bara povtorno da se logira korisnikot. Dokolku e vkluce tokenot, avtomatski pri registracija korisnikot ke bide logiran
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    //* Proveruvame dali ima vneseno email ili pass
    if (!email || !password) {
      return res.status(400).send("Please provide email and password!");
    }

    //* Proveruvame dali korisnikot postoi
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("This user with this email doesn't exist!");
    }

    //* Go povikuvame bcrypt modulot; Sporeduvame passwordi (vneseniot od korisnikot so zacuvaniot vo serverot)
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid password.");
    }

    //* Ako se e tocno, se generira tokenot so sign metoda(za razlika od sign up, vo login se zamenuva newUser so User)
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    //* Na kraj se isprakja tokenot
    res.status(201).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(500).send("Internal server errror.");
  }
};
