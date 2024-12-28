// Imports
const Router = require("express-promise-router");
const passport = require("../config/passport-config");
const authController = require("../controllers/auth.controller");
const authValidator = require("../validators/auth.validator");
const env = require("../config/environment");

const authRouter = new Router();

// Registers a new customer
authRouter.post(
  "/register",
  // Validate the input
  authValidator.validateRegistrationInput,
  // Register the customer
  authController.handleRegistrationLocal,
  // Redirect the user
  authController.handleRedirectFromLocal
);

// Authenticates the user and creates a session
authRouter.post(
  "/login",
  // Validate the input
  authValidator.validateLoginInput,
  // Authenticate the user
  passport.authenticate("local"),
  authController.handlePostLogin,
  // Redirect the user
  authController.handleRedirectFromLocal
);

// Google login
authRouter.get("/google", passport.authenticate("google"));
// Google callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google"),
  authController.handlePostLogin,
  // Redirect the user
  authController.handleRedirectFromThirdParty
);

// Logout
authRouter.post("/logout", authController.handleLogout);

module.exports = authRouter;
