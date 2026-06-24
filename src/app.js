const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Juin",
    lastName: "Banerjee",
    emailId: "indrajit123@gmail.com",
    password: "indrajit@123",
    age: 33,
  });
  await user.save();
  res.send("User Added Successfully !");
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
