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
