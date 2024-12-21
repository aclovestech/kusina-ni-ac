// Imports
const { param, body } = require("express-validator");
const validate = require("./validate");

// Validates the input for the address ID
exports.validateAddressIdInput = [
  param("address_id", "Invalid address ID").isUUID(4),
  // Error handler
  validate,
];

// Validates the input for a new address data
exports.validateNewAddressDataInput = [
  body("address_line1", "Invalid address line 1")
    .trim()
    .escape()
    .isLength({ max: 100 }),
  body("address_line2", "Invalid address line 2")
    .trim()
    .escape()
    .isLength({ max: 100 })
    .optional(),
  body("city", "Invalid city").trim().escape().isLength({ max: 50 }),
  body("state", "Invalid state").trim().escape().isLength({ max: 50 }),
  body("postal_code", "Invalid postal code")
    .trim()
    .escape()
    .isLength({ max: 20 })
    .isPostalCode("any"),
  body("country", "Invalid country").trim().escape().isLength({ max: 50 }),
  body("phone_number", "Invalid phone number")
    .trim()
    .escape()
    .isMobilePhone("any"),
  body("is_default", "Invalid is_default").isBoolean().toBoolean(),
  // Error handler
  validate,
];

// Validates the input for address data to be updated
exports.validateAddressDataToUpdateInput = [
  body("address_line1", "Invalid address line 1")
    .trim()
    .escape()
    .isLength({ max: 100 })
    .optional(),
  body("address_line2", "Invalid address line 2")
    .trim()
    .escape()
    .isLength({ max: 100 })
    .optional(),
  body("city", "Invalid city").trim().escape().isLength({ max: 50 }).optional(),
  body("state", "Invalid state")
    .trim()
    .escape()
    .isLength({ max: 50 })
    .optional(),
  body("postal_code", "Invalid postal code")
    .trim()
    .escape()
    .isLength({ max: 20 })
    .isPostalCode("any")
    .optional(),
  body("country", "Invalid country")
    .trim()
    .escape()
    .isLength({ max: 50 })
    .optional(),
  body("phone_number", "Invalid phone number")
    .trim()
    .escape()
    .isMobilePhone()
    .optional(),
  body("is_default", "Invalid is_default").isBoolean().optional().toBoolean(),
  // Error handler
  validate,
];
