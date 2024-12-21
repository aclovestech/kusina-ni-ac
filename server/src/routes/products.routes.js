// Imports
const Router = require("express-promise-router");
const productsValidator = require("../validators/products.validator");
const productsController = require("../controllers/products.controller");

const productsRouter = new Router();

// Gets all categories
productsRouter.get("/categories", productsController.handleGetAllCategories);

// Gets all products regardless of category
productsRouter.get(
  "/all",
  // Validate the input
  productsValidator.validateCurrentPageInput,
  // Then get the products
  productsController.handleGetAllProducts
);

// Gets the products with a given category ID
productsRouter.get(
  "/",
  // Validate the input
  productsValidator.validateCategoryIdInput,
  productsValidator.validateCurrentPageInput,
  // Then get the products
  productsController.handleGetProductsByCategoryId
);

// Gets a specific product by ID
productsRouter.get(
  "/:product_id",
  // Validate the input
  productsValidator.validateProductIdInput,
  // Then get the product
  productsController.handleGetProductByProductId
);

module.exports = productsRouter;
