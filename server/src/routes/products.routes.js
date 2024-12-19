// Imports
const Router = require("express-promise-router");
const jwt = require("../utils/jwt");
const generalMiddleware = require("../middleware/general.middleware");
const productsMiddleware = require("../middleware/products.middleware");
const productsController = require("../controllers/products.controller");

const productsRouter = new Router();

// Gets the products with a given category
productsRouter.get(
  "/",
  productsMiddleware.validateProductWithCategoryQueryInput,
  productsController.getProductsByCategory
);

// Adds a product to the database
productsRouter.post(
  "/",
  jwt.authenticateToken,
  generalMiddleware.validateIsUserASeller,
  productsMiddleware.validateNewProductDetailsInput,
  productsController.insertProduct
);

// Provides the details of a specific product
productsRouter.get(
  "/:productId",
  productsMiddleware.validateProductIdInput,
  productsController.getProductDetails
);

// Updates the details of a specific product
productsRouter.put(
  "/:productId",
  jwt.authenticateToken,
  generalMiddleware.validateIsUserASeller,
  productsMiddleware.validateSellerProduct,
  productsMiddleware.validateUpdatedProductDetailsInput,
  productsController.updateProduct
);

// Deletes a product with the specified product ID
productsRouter.delete(
  "/:productId",
  jwt.authenticateToken,
  generalMiddleware.validateIsUserASeller,
  productsMiddleware.validateSellerProduct,
  productsController.deleteProduct
);

module.exports = productsRouter;
