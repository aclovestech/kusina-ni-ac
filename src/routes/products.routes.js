// Express promise router
const Router = require("express-promise-router");
// JWT
const jwt = require("../utils/jwt");
// HttpError
const HttpError = require("../utils/HttpError");
// DB (Knex)
const {
  getProductsByCategoryId,
  insertProduct,
  getProductDetailsByProductId,
  updateProductByProductId,
  deleteProductByProductId,
} = require("../models/products.model");
// Validations
const { validateIsUserASeller } = require("../middleware/general.middleware");
const {
  validateProductWithCategoryQueryInput,
  validateNewProductDetailsInput,
  validateProductIdInput,
  validateUpdatedProductDetailsInput,
  validateSellerProduct,
} = require("../middleware/products.middleware");

const productsRouter = new Router();

// Gets the products with a given category
productsRouter.get(
  "/",
  validateProductWithCategoryQueryInput,
  async (req, res, next) => {
    // Query: Get the products by category ID
    const result = await getProductsByCategoryId(
      req.validatedProductWithCategoryQueryInput.category_id
    );

    // Throw an error if the result is empty
    if (result.length === 0) {
      throw new HttpError("No products found", 404);
    }

    // Return the products
    res.status(200).json(result);
  }
);

// Adds a product to the database
productsRouter.post(
  "/",
  jwt.authenticateToken,
  validateIsUserASeller,
  validateNewProductDetailsInput,
  async (req, res, next) => {
    // Query: Insert the product
    const result = await insertProduct(req.validatedNewProductDetailsInput);

    // Throw an error if the result is empty
    if (result.length === 0) {
      throw new HttpError("No products found", 404);
    }

    // Return the newly created product
    res.status(201).json(result);
  }
);

// Provides the details of a specific product
productsRouter.get(
  "/:productId",
  validateProductIdInput,
  async (req, res, next) => {
    // Query: Get the product details
    const result = await getProductDetailsByProductId(
      req.validatedProductIdInput.product_id
    );

    // Throw an error if the product is not found
    if (!result) {
      throw new HttpError("Product not found", 404);
    }

    // Return the products
    res.status(200).json(result);
  }
);

// Updates the details of a specific product
productsRouter.put(
  "/:productId",
  jwt.authenticateToken,
  validateIsUserASeller,
  validateSellerProduct,
  validateUpdatedProductDetailsInput,
  async (req, res, next) => {
    // Query: Update the product
    const result = await updateProductByProductId(
      req.params.productId,
      req.validatedUpdatedProductDetailsInput
    );

    // Return the updated product
    res.status(200).json(result);
  }
);

// Deletes a product with the specified product ID
productsRouter.delete(
  "/:productId",
  jwt.authenticateToken,
  validateIsUserASeller,
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

module.exports = productsRouter;
