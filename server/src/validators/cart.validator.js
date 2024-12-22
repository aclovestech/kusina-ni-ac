const { body } = require("express-validator");
const validate = require("./validate");

exports.validateProductIdInput = [
  body("product_id", "Invalid product ID").isUUID(4),
  // Error handler
  validate,
];

exports.validateQuantityInput = [
  body("quantity", "Invalid quantity").isInt({ min: 1 }).toInt(),
  // Error handler
  validate,
];
