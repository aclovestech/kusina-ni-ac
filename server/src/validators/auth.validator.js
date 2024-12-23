// Imports
const { body } = require("express-validator");
const validate = require("./validate");

// Validates the input for registration
exports.validateRegistrationInput = [
  body("first_name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("First name is required")
    .bail(),
  body("last_name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Last name is required")
    .bail(),
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email is required")
    .bail(),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password is required")
    .bail(),
  // Error handling
  validate,
];

// Validates the input for login
exports.validateLoginInput = [
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email is required")
    .bail(),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password is required")
    .bail(),
  // Error handling
  validate,
];
