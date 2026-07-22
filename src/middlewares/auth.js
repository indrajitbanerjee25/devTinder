const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please log in to access this resource.",
      });
    }
    const decodedValue = await jwt.verify(token, "IndraProject@369");
    const { _id } = decodedValue;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Doesnot exist");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
};

module.exports = { userAuth };
