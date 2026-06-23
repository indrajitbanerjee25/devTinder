const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user!!");
    res.send("Response from Route Handler 1");
    next();
  },
  (req, res, next) => {
    console.log("Handling route user2 ");
    res.send("Response from Route Handler 2");
    next();
  },
  (req, res, next) => {
    console.log("Handling route user3 ");
    res.send("Response from Route Handler 3");
    next();
  },
);
app.listen(3000, () => {
  console.log("Server listning on port 3000");
});
