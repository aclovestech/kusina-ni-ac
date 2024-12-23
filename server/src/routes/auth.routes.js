// Imports
const Router = require("express-promise-router");
const passport = require("../config/passport-config");
const authController = require("../controllers/auth.controller");
const authValidator = require("../validators/auth.validator");

const authRouter = new Router();

// Registers a new customer
authRouter.post(
  "/register",
  // Validate the input
  authValidator.validateRegistrationInput,
  // Register the customer
  authController.handleRegistration
);

// Authenticates the user and creates a session
authRouter.post(
  "/login",
  // Validate the input
  authValidator.validateLoginInput,
  // Authenticate the user
  passport.authenticate("local"),
  authController.handlePostLogin
);

module.exports = authRouter;
