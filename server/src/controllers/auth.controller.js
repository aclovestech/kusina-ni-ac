// Imports
const authModel = require("../models/auth.model");
const { getValidCart, createNewCart } = require("../models/cart.model");
const { matchedData } = require("express-validator");
const { hashPassword } = require("../utils/bcrypt");
const env = require("../config/environment");

exports.handleRegistrationLocal = async (req, res, next) => {
  // Get the validated data
  const userInput = matchedData(req);

  // Hash the password
  userInput.password_hash = await hashPassword(userInput.password);

  // Make the query to the database
  const user = await authModel.addNewCustomerLocal(userInput);

  // Log the user in
  req.login(user, (err) => {
    if (err) return next(err);
  });

  // Move to the next middleware
  next();
};

exports.handlePostLogin = async (req, res, next) => {
  // Get the customer's cart ID
  let cart_id;
  const cart = await getValidCart(req.user.customer_id);

  // If the cart doesn't exist, create a new one
  if (!cart) {
    cart_id = await createNewCart(req.user.customer_id);
  } else {
    cart_id = cart.cart_id;
  }

  // Add the cart ID to the session
  req.session.cart_id = cart_id;

  // Update the user's last login timestamp
  await authModel.updateCustomerLastLogin(req.user.customer_id);

  // Move to the next middleware
  next();
};

exports.handleLogout = (req, res, next) => {
  // Log the user out
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    // Return that the user was logged out
    res.status(200).json({ message: "Logged out successfully" });
  });
};

exports.handleRedirectFromLocal = (req, res, next) => {
  // Return that the user was logged in
  res.json({ message: "Logged in successfully" });
};

exports.handleRedirectFromThirdParty = (req, res, next) => {
  // Redirect the user to the app's home page
  res.redirect(`${env.CLIENT_URL}/`);
};
