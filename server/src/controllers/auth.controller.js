// Imports
const authModel = require("../models/auth.model");
const jwt = require("../utils/jwt");
const { matchedData } = require("express-validator");
const { hashPassword } = require("../utils/bcrypt");

exports.addNewCustomer = async (req, res, next) => {
  // Get the validated data
  const userInput = matchedData(req);

  // Hash the password
  userInput.password_hash = await hashPassword(userInput.password);

  // Make the query to the database
  const result = await authModel.insertCustomer(userInput);

  // Return the newly created user info
  res.status(201).json(result);
};

exports.loginCustomer = (req, res, next) => {
  const token = jwt.generateAccessToken(req.user);

  // Return the token
  res.status(201).json({ token });
};
