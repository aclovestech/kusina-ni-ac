// Express promise router
const Router = require("express-promise-router");
// JWT
const jwt = require("../utils/jwt");
// HttpError
const HttpError = require("../utils/HttpError");
// Joi
const Joi = require("joi");
// DB (Knex)
const {
  getProductsByCategoryId,
  isCategoryIdValid,
  insertProduct,
  getProductDetailsByProductId,
  updateProductByProductId,
  deleteProductByProductId,
} = require("../db/db-products");

const productsRouter = new Router();

// Provides the products with a specific category (/products?category={categoryId})
productsRouter.get("/", async (req, res, next) => {
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

  // Query: Get the products by category ID
  const result = await getProductsByCategoryId(value.category_id);

  // Throw an error if the result is empty
  if (result.length === 0) {
    throw new HttpError("No products found", 404);
  }

  // Return the products
  res.status(200).json(result);
});

// Adds a product to the database
productsRouter.post(
  "/",
  jwt.authenticateToken,
  checkUserAuthorization,
  async (req, res, next) => {
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

    // Query: Insert the product
    const result = await insertProduct(value);

    // Throw an error if the result is empty
    if (result.length === 0) {
      throw new HttpError("No products found", 404);
    }

    // Return the newly created product
    res.status(201).json(result);
  }
);

// Provides the details of a specific product
productsRouter.get("/:productId", async (req, res, next) => {
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

  // Query: Get the product details
  const result = await getProductDetailsByProductId(value.product_id);

  // Throw an error if the product is not found
  if (!result) {
    throw new HttpError("Product not found", 404);
  }

  // Return the products
  res.status(200).json(result);
});

// Updates the details of a specific product
productsRouter.put(
  "/:productId",
  jwt.authenticateToken,
  checkUserAuthorization,
  validateSellerProduct,
  async (req, res, next) => {
    // Specify joi schema
    const schema = Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number(),
      stock_quantity: Joi.number(),
      category_id: Joi.number(),
    });

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

    // Query: Update the product
    const result = await updateProductByProductId(req.params.productId, value);

    // Return the updated product
    res.status(200).json(result);
  }
);

// Deletes a product with the specified product ID
productsRouter.delete(
  "/:productId",
  jwt.authenticateToken,
  checkUserAuthorization,
  validateSellerProduct,
  async (req, res, next) => {
    // Query: Delete the product
    await deleteProductByProductId(req.params.productId);

    // Send a 200 status response if the transaction was successful
    res
      .status(200)
      .send({ success: true, message: "Product successfully deleted" });
  }
);

// Checks if the user is a seller or an admin
function checkUserAuthorization(req, res, next) {
  // Get the role_id from the JWT
  const { role_name } = req.user;

  // Throw an error if the user is not a seller
  if (role_name !== "Seller" && role_name !== "Admin") {
    throw new HttpError("Unauthorized", 401);
  }

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

module.exports = productsRouter;
