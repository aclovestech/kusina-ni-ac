// Imports
const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  // Validate
  const errors = validationResult(req);

  // Throw an error if there's an error
  if (!errors.isEmpty()) {
    // Get the error messages
    const reasons = errors.array().map((error) => {
      return error.msg;
    });

    // Return the error
    return res.status(400).json({ success: false, message: reasons });
  }

  // Move to the next middleware
  next();
};

module.exports = validate;
