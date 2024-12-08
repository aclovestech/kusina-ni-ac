// Express promise router
const Router = require("express-promise-router");
// Passport-related
const passport = require("../utils/passport-config");
// JWT-related
const jwt = require("../utils/jwt");
// DB (Knex)
const { insertUser } = require("../db/db-auth");
// Validations
const { validateRegistrationInput } = require("../utils/validations/auth");

const authRouter = new Router();

// Registers a new customer
authRouter.post(
  "/register",
  validateRegistrationInput,
  async (req, res, next) => {
    // Query: Create a new row for the user (transaction)
    const result = await insertUser(req.validateRegistrationInput);

    // Return the newly created user info
    res.status(201).json(result);
  }
);

// Authenticates the user and gives back a JWT
authRouter.post(
  "/login",
  // Authenticate the user
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    // Return the token if the user is authenticated
    const token = jwt.generateAccessToken(req.user);

    // Return the token
    res.status(201).json({ token });
  }
);

module.exports = authRouter;
