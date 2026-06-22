const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

app.use("/hello", (req, res) => {
  res.send("Hello from the Dsshboard");
});

app.use("/", (req, res) => {
  res.send("Welcome to Node");
});

app.listen(3000, () => {
  console.log("Server listning on port 3000");
});
