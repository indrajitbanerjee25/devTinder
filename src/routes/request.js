const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user");

requestRouter.delete("/deleteUser", async (req, res) => {
  try {
    const useId = req.body._id;
    const deleteUser = await User.findByIdAndDelete(useId);
    res.send("User Deleted successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

requestRouter.patch("/update/:userId", async (req, res) => {
  try {
    const data = req.body;
    const userId = req.params?.userId;
    const UPDATE_ALLOWED = ["userID", "photourl", "skills", "age", "about"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      UPDATE_ALLOWED.includes(k),
    );
    if (data?.skills.length > 3) {
      throw new Error("Max 3 skills allowed");
    }
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    const updateUser = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send("User updated successfully!!!!");
  } catch (err) {
    res.status(404).send("UPDATE FAILED:" + err.message);
  }
});

requestRouter.get("/find", async (req, res) => {
  const userEmailId = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmailId });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

module.exports = requestRouter;
