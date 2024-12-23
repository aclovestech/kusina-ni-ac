// Imports
const { param } = require("express-validator");
const validate = require("./validate");

exports.validateOrderIdInput = [
  param("order_id", "Invalid order ID").isUUID(4),
  // Error handler
  validate,
];
