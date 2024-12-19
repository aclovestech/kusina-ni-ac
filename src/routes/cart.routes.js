// Express promise router
const Router = require("express-promise-router");
// DB (Knex)
const {
  createNewCart,
  addItemsToCart,
  getCartItemsByCartId,
  updateCartItemQuantity,
  deleteCartItemByCartIdAndProductId,
  checkoutCart,
} = require("../db/db-cart");
// Validations
const {
  validateCartIdInput,
  validateCartItemsInput,
  validateCartItemToUpdateInput,
  validateProductIdInput,
  validateAddressIdInput,
} = require("../utils/validations/cart");

const cartRouter = new Router();

// Creates a new cart
cartRouter.post("/", async (req, res, next) => {
  // Query: Create a new cart
  const result = await createNewCart(req.user.user_id);

  // Return the newly created cart
  res.status(201).json(result);
});

// Gets a specific cart
cartRouter.get("/:cartId", validateCartIdInput, async (req, res, next) => {
  // Query: Get the cart details
  const result = await getCartItemsByCartId(req.validatedCartIdInput.cart_id);

  // Return the cart
  res.status(200).json(result);
});

// Adds an item/multiple items to a specific cart
cartRouter.post(
  "/:cartId",
  validateCartIdInput,
  validateCartItemsInput,
  async (req, res, next) => {
    // Query: Add items to the cart
    const result = await addItemsToCart(
      req.validatedCartIdInput.cart_id,
      req.validatedCartItemsInput.items
    );

    // Return the updated cart
    res.status(201).json(result);
  }
);

// Updates the quantity of an item in a specific cart
cartRouter.put(
  "/:cartId/:productId",
  validateCartIdInput,
  validateCartItemToUpdateInput,
  async (req, res, next) => {
    // Query: Add items to the cart
    const result = await updateCartItemQuantity(
      req.validatedCartIdInput.cart_id,
      req.validatedCartItemToUpdateInput.product_id,
      req.validatedCartItemToUpdateInput.quantity
    );

    // Return the updated cart
    res.status(200).json(result);
  }
);

// Deletes an item from a specific cart
cartRouter.delete(
  "/:cartId/:productId",
  validateCartIdInput,
  validateProductIdInput,
  async (req, res, next) => {
    // Query: Delete an item from the cart
    await deleteCartItemByCartIdAndProductId(
      req.validatedCartIdInput.cart_id,
      req.validatedProductIdInput.product_id
    );

    // Return that the item was deleted
    res.status(200).json({ success: true, message: "Item deleted from cart" });
  }
);

// Checks out a specific cart
cartRouter.post(
  "/:cartId/checkout",
  validateCartIdInput,
  validateAddressIdInput,
  async (req, res, next) => {
    // Query: Checkout the cart
    const result = await checkoutCart(
      req.validatedCartIdInput.cart_id,
      req.user.user_id,
      req.validatedAddressIdInput.address_id
    );

    // Return the response
    res.status(200).json(result);
  }
);

module.exports = cartRouter;
