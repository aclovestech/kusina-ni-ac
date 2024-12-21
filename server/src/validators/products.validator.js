// Imports
const { param, query } = require("express-validator");
const validate = require("./validate");

// Validates the input for the current page
exports.validateCurrentPageInput = [
  query("page", "Invalid page").isInt({ min: 1 }).toInt(),
  // Error handler
  validate,
];

// Validates the input for category ID
exports.validateCategoryIdInput = [
  query("category_id", "Invalid category ID").isNumeric().toInt(),
  // Error handler
  validate,
];

// Validates the input for product ID
exports.validateProductIdInput = [
  param("product_id", "Invalid product ID").isUUID(4),
  // Error handler
  validate,
];
