const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//1st create Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
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
      maxLength: 50,
      validate(value) {
        if (!/^[A-Za-z]+$/.test(value)) {
          throw new Error("Please enter Character only");
        }
      },
    },
    emailId: {
      type: String,
      lovercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw Error("Invalid email address", +value);
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
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 5) {
          throw new Error("Only 3 skills allowed");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://toppng.com/show_download/239768/donna-picarro-dummy-avatar",
      validate(value) {
        if (!validator.isURL(value)) {
          throw Error("Invalid Photo URL", +value);
        }
      },
    },
    about: { type: String, default: "This is default description of the user" },
  },
  { timestamps: true },
);

//userSchema.index({ firstName: 1, lastName: 1 });
//userSchema.index({ gender: 1 });

userSchema.methods.JWTtoken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "IndraProject@369", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordhash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordhash,
  );
  return isPasswordValid;
};

//const User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
