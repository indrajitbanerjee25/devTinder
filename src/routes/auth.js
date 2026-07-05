const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validationSignUpData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validationSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.JWTtoken();

      res.cookie("token", token);
      res.send("Login successfully");
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = authRouter;
