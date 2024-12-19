// Imports
const Joi = require("joi");
const HttpError = require("../utils/HttpError");

// Validates the input for registration
exports.validateRegistrationInput = async (req, res, next) => {
  // Convert role to lowercase if it exists
  req.body.role = req.body.role?.toLowerCase();

  // Throw an error if the role given is admin
  if (req.body.role === "admin") {
    throw new HttpError("Unauthorized", 400);
  }

  // Specify joi schema
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().default("customer").valid("customer", "seller"),
  });

  // Validate the input
  const { value, error } = schema.validate(req.body, {
    stripUnknown: true,
  });

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Missing required data", 400);
  }

  // Save the validated input in the request
  req.validatedRegistrationInput = value;

  // Set the role_id based on the role_name
  if (req.validatedRegistrationInput.role === "seller") {
    req.validatedRegistrationInput.role_id = 2;
  } else if (req.validatedRegistrationInput.role === "customer") {
    req.validatedRegistrationInput.role_id = 3;
  }

  // Bcrypt
  const { hashPassword } = require("../utils/bcrypt");

  // Hash the given password and save it within the validated input
  req.validatedRegistrationInput.password_hash = await hashPassword(
    value.password
  );

  // Move to the next middleware
  next();
};

// Validates the input for login
exports.validateLoginInput = async (username, password) => {
  // Specify joi schema
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  // Validate the input
  const { value } = schema.validate({
    email: username,
    password: password,
  });

  // Return the validated input
  return value;
};
