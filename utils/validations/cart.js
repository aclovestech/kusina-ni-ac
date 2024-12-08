// HttpError
const HttpError = require("../HttpError");
// Joi
const Joi = require("joi");
// DB (Knex)
const { validateCartIdByUserId } = require("../../db/db-cart");
const { getUserAddressesByUserId } = require("../../db/db-users");

// Validates the input for cart ID
async function validateCartIdInput(req, res, next) {
  // Specify joi schema
  const schema = Joi.object(
    {
      cart_id: Joi.string().uuid().required(),
    },
    { stripUnknown: true }
  );

  // Validate the input
  const { value, error } = schema.validate({
    cart_id: req.params.cartId,
  });

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Invalid input data", 400);
  }

  // Query: Validate the cart ID
  const isValid = await validateCartIdByUserId(value.cart_id, req.user.user_id);

  // Throw an error if the cart ID is invalid
  if (!isValid) {
    throw new HttpError("Unauthorized", 401);
  }

  // Save the validated cart ID in the request
  req.validatedCartIdInput = value;

  // Move to the next middleware
  next();
}

// Validates the input for address ID
async function validateAddressIdInput(req, res, next) {
  // Specify joi schema
  const schema = Joi.object({
    address_id: Joi.string().uuid().required(),
  });

  // Validate the input
  const { value, error } = schema.validate(
    {
      address_id: req.body.address_id,
    },
    { stripUnknown: true }
  );

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Invalid input data", 400);
  }

  // Query: Get the user's addresses
  const addresses = await getUserAddressesByUserId(req.user.user_id);

  // Throw an error if the address ID is invalid
  const isValid = addresses.find(
    (address) => address.address_id === value.address_id
  );
  if (!isValid) {
    throw new HttpError("Invalid address ID", 400);
  }

  // Save the validated address in the request
  req.validatedAddressIdInput = value;

  // Move to the next middleware
  next();
}

// Validates the input for cart items
function validateCartItemsInput(req, res, next) {
  // Specify joi schema for a single item
  const itemSchema = Joi.object(
    {
      product_id: Joi.string().uuid().required(),
      quantity: Joi.number().integer().min(1).required(),
    },
    { stripUnknown: true }
  );
  // Specify joi schema for inputting all items
  const itemsSchema = Joi.object(
    {
      items: Joi.array().items(itemSchema).min(1).required(),
    },
    { stripUnknown: true }
  );

  // Validate the input
  const { value, error } = itemsSchema.validate(req.body);

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Invalid input data", 400);
  }

  // Save the validated items in the request
  req.validatedCartItemsInput = value;

  // Move to the next middleware
  next();
}

// Validates the input for a single cart item
function validateCartItemToUpdateInput(req, res, next) {
  // Specify joi schema
  const schema = Joi.object({
    product_id: Joi.string().uuid().required(),
    quantity: Joi.number().integer().min(1).required(),
  });

  // Validate the input
  const { value, error } = schema.validate(
    {
      product_id: req.params.productId,
      quantity: req.body.quantity,
    },
    { stripUnknown: true }
  );

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Invalid input data", 400);
  }

  // Save the validated item in the request
  req.validatedCartItemToUpdateInput = value;

  // Move to the next middleware
  next();
}

// Validates the input for product ID
function validateProductIdInput(req, res, next) {
  // Specify joi schema
  const schema = Joi.object({
    product_id: Joi.string().uuid().required(),
  });

  // Validate the input
  const { value, error } = schema.validate(
    {
      product_id: req.params.productId,
    },
    { stripUnknown: true }
  );

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Invalid input data", 400);
  }

  // Save the validated product ID in the request
  req.validatedProductIdInput = value;

  // Move to the next middleware
  next();
}

module.exports = {
  validateCartIdInput,
  validateAddressIdInput,
  validateCartItemsInput,
  validateCartItemToUpdateInput,
  validateProductIdInput,
};
