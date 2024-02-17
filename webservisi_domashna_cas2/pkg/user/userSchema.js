const mongoose = require("mongoose");
const validator = require("validator"); //*proveruvame dali emailot e vistinski
const bcrypt = require("bcryptjs"); //*ni pomaga da go enkriptirame passwordot

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    reqired: [true, "E-mail is required."],
    unique: true, //*sprechuva da ne moze so ist mail da se najavat poveke korisnici
    lowercase: true, //* site bukvi da se mali
    validate: [validator.isEmail, "Please provide a valid email."], //* .isEmail e metoda sto proveruva dali emailot e vistinski
  },
  role: {
    type: String,
    enum: ["user", "admin", "administaror"], //*koi elementi da gi iskoristi od eden array(vo slucajov ili user ili admin ili administrator)
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [6, "Password must be at least 6 characters long"],
    // validate: [validator.isStrongPassword, "Please provide a strong password."], //* validacija dali e jak passwordot; isStrongPassword - metoda za validacija na jacina na password
  },
});

//! Hashiranje na passwordi so implementiranje na pre.save middleware na mongoose; ova e delot koga gi dobivame podatocite i delot pred gi stavame vo baza; celta e da ne se pokazuva passwordot
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //*ako vo slucaj nema promena vo pass se hashira
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
