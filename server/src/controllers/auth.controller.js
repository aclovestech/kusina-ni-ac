// Imports
const authModel = require("../models/auth.model");
const { matchedData } = require("express-validator");
const { hashPassword } = require("../utils/bcrypt");

exports.handleRegistration = async (req, res, next) => {
  // Get the validated data
  const userInput = matchedData(req);

  // Hash the password
  userInput.password_hash = await hashPassword(userInput.password);

  // Make the query to the database
  const result = await authModel.addNewCustomer(userInput);

  // Return the newly created user info
  res.status(201).json(result);
};
