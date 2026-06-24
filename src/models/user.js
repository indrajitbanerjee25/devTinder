const mongoose = require("mongoose");

//1st create Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  emailId: String,
  password: String,
  age: Number,
  gender: String,
});

// 2nd Create Model
const User = mongoose.model("User", userSchema);
//Export

module.exports = User;
