// DB (Knex)
const authModel = require("../models/auth.model");
// JWT-related
const jwt = require("../utils/jwt");

exports.createUser = async (req, res, next) => {
  // Query: Create a new row for the user (transaction)
  const result = await authModel.insertUser(req.validatedRegistrationInput);

  // Return the newly created user info
  res.status(201).json(result);
};

exports.loginUser = (req, res, next) => {
  // Return the token if the user is authenticated
  const token = jwt.generateAccessToken(req.user);

  // Return the token
  res.status(201).json({ token });
};
