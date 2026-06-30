const validator = require("validator");

const validationSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("First name should be 4-50 character");
  } else if (lastName.length < 4 || lastName.length > 50) {
    throw new Error("Last name should be 4-50 character");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

module.exports = { validationSignUpData };
