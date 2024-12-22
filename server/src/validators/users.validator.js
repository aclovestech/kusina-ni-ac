// Imports
const { param, body } = require("express-validator");
const validate = require("./validate");

// Validates the input for customer ID
// exports.validateCustomerIdInput = [
//   param("customer_id", "Invalid customer ID").isUUID(4),
//   // Error handler
//   validate,
// ];

// Validates the input for the customer's basic data
exports.validateCustomerDataInput = [
  body("email", "Invalid email").trim().normalizeEmail().isEmail().optional(),
  body("password", "Invalid password").trim().isLength({ min: 8 }).optional(),
  body("first_name", "Invalid first name").trim().escape().optional(),
  body("last_name", "Invalid last name").trim().escape().optional(),
  body("date_of_birth", "Invalid date of birth").isDate().optional(),
  body("loyalty_points", "Invalid loyalty points").isNumeric().optional(),
  // Error handler
  validate,
];
