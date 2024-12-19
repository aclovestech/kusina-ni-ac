// Imports
const Router = require("express-promise-router");
const cartController = require("../controllers/cart.controller");
const cartMiddleware = require("../middleware/cart.middleware");

const cartRouter = new Router();

// Creates a new cart
cartRouter.post("/", cartController.createNewCart);

// Gets a specific cart
cartRouter.get(
  "/:cartId",
  cartMiddleware.validateCartIdInput,
  cartController.getSpecificCart
);

// Adds an item/multiple items to a specific cart
cartRouter.post(
  "/:cartId",
  cartMiddleware.validateCartIdInput,
  cartMiddleware.validateCartItemsInput,
  cartController.addItemsToCart
);

// Updates the quantity of an item in a specific cart
cartRouter.put(
  "/:cartId/:productId",
  cartMiddleware.validateCartIdInput,
  cartMiddleware.validateCartItemToUpdateInput,
  cartController.updateCartItemQuantity
);

// Deletes an item from a specific cart
cartRouter.delete(
  "/:cartId/:productId",
  cartMiddleware.validateCartIdInput,
  cartMiddleware.validateProductIdInput,
  cartController.deleteCartItem
);

// Checks out a specific cart
cartRouter.post(
  "/:cartId/checkout",
  cartMiddleware.validateCartIdInput,
  cartMiddleware.validateAddressIdInput,
  cartController.checkoutCart
);

module.exports = cartRouter;
