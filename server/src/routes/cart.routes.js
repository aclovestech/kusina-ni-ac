// Imports
const Router = require("express-promise-router");
const cartController = require("../controllers/cart.controller");
const cartValidator = require("../validators/cart.validator");
const {
  validateAddressIdInput,
} = require("../validators/users-addresses.validator");
const { checkIsCustomerLoggedIn } = require("../middleware/session.middleware");

const cartRouter = new Router();

// Middleware that checks if the user is logged in
cartRouter.use(checkIsCustomerLoggedIn);

// Creates a new cart
cartRouter.post("/create", cartController.handleCreateNewCart);

// Group routes
cartRouter
  .route("/")
  // Gets a specific cart
  .get(cartController.handleGetCartDetails)
  // Adds a product to the cart
  .post(
    // Validate the input
    cartValidator.validateProductIdInput,
    cartValidator.validateQuantityInput,
    // Then add the product
    cartController.handleAddProductsToCart
  )
  // Updates the quantity of a product in a cart
  .patch(
    // Validate the input
    cartValidator.validateProductIdInput,
    cartValidator.validateQuantityInput,
    // Then update the quantity
    cartController.handleUpdateCartItem
  )
  // Deletes an item from a specific cart
  .delete(
    // Validate the input
    cartValidator.validateProductIdInput,
    // Then delete the item
    cartController.handleDeleteCartItem
  );

// Creates a new Stripe checkout session
cartRouter.post(
  "/create-checkout-session",
  validateAddressIdInput,
  cartController.handleCreateStripeSession
);

// Checks out a cart
// cartRouter.post("/checkout", cartController.handleCheckout);

module.exports = cartRouter;
