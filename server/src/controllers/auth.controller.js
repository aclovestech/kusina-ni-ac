// Imports
const authModel = require("../models/auth.model");
const jwt = require("../utils/jwt");

// Query: Create a new row for the user (transaction)
exports.createUser = async (req, res, next) => {
  const result = await authModel.insertUser(req.validatedRegistrationInput);

  // Return the newly created user info
  res.status(201).json(result);
};

// Return the token if the user is authenticated
exports.loginUser = (req, res, next) => {
  const token = jwt.generateAccessToken(req.user);

  // Return the token
  res.status(201).json({ token });
};
