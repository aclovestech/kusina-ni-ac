// Joi
const Joi = require("joi");
// HttpError
const HttpError = require("../utils/HttpError");

// Validate order ID
function validateOrderIdInput(req, res, next) {
  // Specify joi schema
  const schema = Joi.object({
    order_id: Joi.string().uuid().required(),
  });

  // Validate the input
  const { value, error } = schema.validate({
    order_id: req.params.orderId,
  });

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Invalid input data", 400);
  }

  // Save the validated order ID in the request
  req.validatedOrderIdInput = value;

  // Move to the next middleware
  next();
}

module.exports = { validateOrderIdInput };
