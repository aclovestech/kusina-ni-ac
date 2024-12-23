// Imports
const authModel = require("../models/auth.model");
const { getValidCart, createNewCart } = require("../models/cart.model");
const { matchedData } = require("express-validator");
const { hashPassword } = require("../utils/bcrypt");

exports.handleRegistration = async (req, res, next) => {
  // Get the validated data
  const userInput = matchedData(req);

  // Hash the password
  userInput.password_hash = await hashPassword(userInput.password);

  // Make the query to the database
  const user = await authModel.addNewCustomer(userInput);

  // Delete the password hash from the data
  delete user.password_hash;

  // Log the user in
  req.login(user, (err) => {
    if (err) return next(err);
  });

  // Create a new cart
  const cart = await createNewCart(user.customer_id);

  // Add the cart ID to the session
  req.session.cart_id = cart.cart_id;

  // Return the newly created user info
  res.status(201).json(user);
};

exports.handlePostLogin = async (req, res, next) => {
  // Get the customer's cart ID
  const { cart_id } = await getValidCart(req.user.customer_id);

  // Add the cart ID to the session
  req.session.cart_id = cart_id;

  // Return the user
  res.json(req.user);
};
