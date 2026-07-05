const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const auth = require("./routes/auth");
const profile = require("./routes/profile");

app.use(express.json());
app.use(cookieParser());

app.use("/", auth);
app.use("/", profile);

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
