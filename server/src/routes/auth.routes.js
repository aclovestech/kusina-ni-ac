// Imports
const Router = require("express-promise-router");
const passport = require("../config/passport-config");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const authValidator = require("../validators/auth.validator");

const authRouter = new Router();

// Registers a new customer
authRouter.post(
  "/register",
  authValidator.validateRegistrationInput,
  authController.addNewCustomer
);

// Authenticates the user and gives back a JWT
authRouter.post(
  "/login",
  // Authenticate the user
  passport.authenticate("local", { session: false }),
  authController.loginCustomer
);

module.exports = authRouter;
