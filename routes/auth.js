// Bcrypt
const bcrypt = require("bcrypt");
// Express promise router
const Router = require("express-promise-router");
// Passport-related
const passport = require("../utils/passport-config");
// JWT-related
const jwt = require("../utils/jwt");
// HttpError
const HttpError = require("../utils/HttpError");
// Joi
const Joi = require("joi");
// DB (Knex)
const { insertUserTransaction } = require("../db/db-auth");

const authRouter = new Router();

// Registers a new customer
authRouter.post(
  "/register",
  validateRegistrationInput,
  async (req, res, next) => {
    // Query: Create a new row for the user (transaction)
    const result = await insertUserTransaction(req.validatedInput);

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
    res.status(201).json({ token });
  }
);

// Validates the input for registration
async function validateRegistrationInput(req, res, next) {
  // Specify joi schema
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role_id: Joi.number(),
  });

  // Validate the input
  const { value, error } = schema.validate(req.body);

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Missing required data", 400);
  }

  // Throw an error if the role_id is 1 (admin)
  if (value.role_id === 1) {
    throw new HttpError("Unauthorized", 400);
  }

  // Save the validated input in the request
  req.validatedInput = value;
  // If the role_id is not provided, set it to 3 (customer)
  req.validatedInput.role_id = req.validatedInput.role_id || 3;
  // Hash the given password and save it within the validated input
  req.validatedInput.password_hash = await hashPassword(value.password);
  // Delete the password property from the validated input
  delete req.validatedInput.password;

  // Move to the next middleware
  next();
}

// Returns a hashed version of the provided plaintext password
async function hashPassword(plaintextPassword) {
  // Set the salt rounds
  const saltRounds = 12;
  // Generate the salt
  const salt = await bcrypt.genSalt(saltRounds);
  // Return the hashed password
  return await bcrypt.hash(plaintextPassword, salt);
}

module.exports = authRouter;
