const express = require("express");

const app = express();

// This will only get call to "/user"
app.get("/user", (req, res) => {
  res.send({ firstname: "Indrajit", lastName: "Banerjee" });
});

app.post("/user", (req, res) => {
  //logig to update data in DB
  res.send("Data Successfully save in DB");
});

app.delete("/user", (req, res) => {
  //Delete logic for user delete
  res.send("Data Successfully Delete from DB");
});

// This will match all HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

app.listen(3000, () => {
  console.log("Server listning on port 3000");
});
