const mongoose = require("mongoose");

//1st create Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
      validate(value) {
        if (!/^[A-Za-z]+$/.test(value)) {
          throw new Error("Please enter Character only");
        }
      },
    },
    lastName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 100,
      validate(value) {
        if (!/^[A-Za-z]+$/.test(value)) {
          throw new Error("Please enter Character only");
        }
      },
    },
    emailId: {
      type: String,
      lovercase: true,
      unique: true,
      trim: true,
      validate(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          throw new Error("Please enter valid email");
        }
      },
    },
    password: { type: String },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    skills: { type: [String] },
    photoUrl: {
      type: String,
      default:
        "https://toppng.com/show_download/239768/donna-picarro-dummy-avatar",
    },
    about: { type: String, default: "This is default description of the user" },
  },
  { timestamps: true },
);

// 2nd Create Model
const User = mongoose.model("User", userSchema);
//Export

module.exports = User;
