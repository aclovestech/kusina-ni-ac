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
// DB-related
const { insertUserTransaction } = require("../db/db");

const authRouter = new Router();

// Registers a new customer
authRouter.post(
  "/register",
  validateRegistrationInput,
  async (req, res, next) => {
    // Destructure the validated input
    const { name, email, hashedPassword, role_id } = req.validatedInput;

    // Query: Create a new row for the user (transaction)
    const result = await insertUserTransaction(
      name,
      email,
      hashedPassword,
      role_id
    );

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

  // If the role_id is not provided, set it to 3 (customer)
  value.role_id = value.role_id || 3;
  // Save the input in the request
  req.validatedInput = value;
  // Hash the given password and save it within the request for future use
  req.validatedInput.hashedPassword = await hashPassword(value.password);

  // Save the input
  next();
}

// Returns a hashed version of the provided plaintext password
async function hashPassword(plaintextPassword) {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plaintextPassword, salt);
}

module.exports = authRouter;
