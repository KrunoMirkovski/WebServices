const mongoose = require("mongoose");
const validator = require("validator"); //*dali emailot e vistinski
const bcrypt = require("bcryptjs"); //*da go enkriptirame passwordot

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "E-mail is required."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"], //*array so elementi sto treba da gi koristi
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [6, "Password must be at least 6 characters long."],
    // validate: [validator.isStrongPassword, "Please provide a strong password."]
  },
});

//! Hashiranje na passwordi - Middleware koj e most pomegju delot koga gi dobivame podatocite i  koga gi stavame vo database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
