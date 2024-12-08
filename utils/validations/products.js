// Joi
const Joi = require("joi");
// HttpError
const HttpError = require("../HttpError");
// DB (Knex)
const {
  isCategoryIdValid,
  getProductDetailsByProductId,
} = require("../../db/db-products");

// Validates the input for product query with category
function validateProductWithCategoryQueryInput(req, res, next) {
  // Specify joi schema
  const schema = Joi.object({
    category_id: Joi.number().required(),
    perPage: Joi.number().required(),
    currentPage: Joi.number().required(),
  });

  // Validate the input
  const { value, error } = schema.validate({
    category_id: req.query.category,
    perPage: req.query.perPage,
    currentPage: req.query.currentPage,
  });

  // Throw an error if the category ID is blank
  if (error) {
    throw new HttpError("Invalid request", 404);
  }

  // Save the validated input in the request
  req.validatedProductWithCategoryQueryInput = value;

  // Move to the next middleware
  next();
}

// Validates the input for the details of a new product
async function validateNewProductDetailsInput(req, res, next) {
  // Get the role_id from the JWT
  const { user_id } = req.user;

  // Specify joi schema
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock_quantity: Joi.number().required(),
    category_id: Joi.number().required(),
  });

  // Validate the input
  const { value, error } = schema.validate(req.body);

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Missing required data", 400);
  }

  // Checks if the category_id is valid
  await isCategoryIdValid(value.category_id);

  // Add the user_id to the input
  value.seller_id = user_id;

  // Save the validated input in the request
  req.validatedNewProductDetailsInput = value;

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
  const { value, error } = schema.validate({
    product_id: req.params.productId,
  });

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Invalid product ID", 404);
  }

  // Save the validated product ID in the request
  req.validatedProductIdInput = value;

  // Move to the next middleware
  next();
}

// Validates the input for the details of a product that is to be updated
function validateUpdatedProductDetailsInput(req, res, next) {
  // Specify joi schema
  const schema = Joi.object(
    {
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number(),
      stock_quantity: Joi.number(),
      category_id: Joi.number(),
    },
    { stripUnknown: true }
  );

  // Validate the input
  const { value, error } = schema.validate(req.body);

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Missing required data", 404);
  }

  // Throw an error if the input is empty
  if (Object.keys(value).length === 0) {
    throw new HttpError("Please provide details to update", 404);
  }

  // Save the validated input in the request
  req.validatedUpdatedProductDetailsInput = value;

  // Move to the next middleware
  next();
}

// Checks if the user is the seller of the product
async function validateSellerProduct(req, res, next) {
  // Get the user_id from the JWT
  const { user_id } = req.user;

  // Query: Get the product details
  const result = await getProductDetailsByProductId(req.params.productId);

  // Throw an error if the product is not found
  if (!result) {
    throw new HttpError("Product not found", 404);
  }

  // Throw an error if the user is not a seller, or if the user is not the seller of the product
  const isSeller = result.seller_id === user_id;
  if (!isSeller) {
    throw new HttpError("Unauthorized", 401);
  }

  // Move to the next middleware
  next();
}

module.exports = {
  validateProductWithCategoryQueryInput,
  validateNewProductDetailsInput,
  validateProductIdInput,
  validateUpdatedProductDetailsInput,
  validateSellerProduct,
};
