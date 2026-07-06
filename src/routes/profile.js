const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const express = require("express");
//const validator = require("validator");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData) {
      throw new Error("Invalid edit result");
    }

    const logInUser = req.user;
    Object.keys(req.body).forEach((key) => (logInUser[key] = req.body[key]));
    await logInUser.save();
    //res.send("Profile edited successfully");
    res.json({
      message: `${logInUser.firstName} your profile updated successfully`,
      data: logInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});
module.exports = profileRouter;
