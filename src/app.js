const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Successfully !!");
  } catch (err) {
    res.status(400).send("Error Saving user");
  }
});

app.get("/find", async (req, res) => {
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

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

app.delete("/deleteUser", async (req, res) => {
  try {
    const useId = req.body._id;
    //const deleteUser = await User.findByIdAndDelete({ _id: useId });
    const deleteUser = await User.findByIdAndDelete(useId);
    res.send("User Deleted successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

app.patch("/update", async (req, res) => {
  try {
    const userId = req.body._id;
    const data = req.body;

    const updateUser = await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("User updated successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server listning on port 3000");
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });
