const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://nodedemoproject:iOBrjjNqmaaPWf6V@nodedemoproject.tsjxbpb.mongodb.net/",
  );
};

module.exports = connectDB;
