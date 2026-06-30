const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { Timestamp } = require("mongodb");
const { validationSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

//signup api for signing the user
app.post("/signup", async (req, res) => {
  try {
    //validate data first
    validationSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // encript data first
    const passwordHash = await bcrypt.hash(password, 10);

    // creating new instance or user model
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
// Feed API - get all the users form the database
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

app.patch("/update/:userId", async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(Object.keys(req.body));

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

app.post("/login", async (req, res) => {
  try {
    // destracut  userid and password from body
    // check/find  userId is present or not
    // compare the password is matched or not

    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login successfully");
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
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
