// Imports
const cartModel = require("../models/cart.model");

// Query: Create a new cart
exports.createNewCart = async (req, res, next) => {
  const result = await cartModel.createNewCart(req.user.user_id);

  // Return the newly created cart
  res.status(201).json(result);
};

// Query: Get the cart details
exports.getSpecificCart = async (req, res, next) => {
  const result = await cartModel.getCartItemsByCartId(
    req.validatedCartIdInput.cart_id
  );

  // Return the cart
  res.status(200).json(result);
};

// Query: Add items to the cart
exports.addItemsToCart = async (req, res, next) => {
  const result = await cartModel.addItemsToCart(
    req.validatedCartIdInput.cart_id,
    req.validatedCartItemsInput.items
  );

  // Return the updated cart
  res.status(201).json(result);
};

// Query: Add items to the cart
exports.updateCartItemQuantity = async (req, res, next) => {
  const result = await cartModel.updateCartItemQuantity(
    req.validatedCartIdInput.cart_id,
    req.validatedCartItemToUpdateInput.product_id,
    req.validatedCartItemToUpdateInput.quantity
  );

  // Return the updated cart
  res.status(200).json(result);
};

// Query: Delete an item from the cart
exports.deleteCartItem = async (req, res, next) => {
  await cartModel.deleteCartItemByCartIdAndProductId(
    req.validatedCartIdInput.cart_id,
    req.validatedProductIdInput.product_id
  );

  // Return that the item was deleted
  res.status(200).json({ success: true, message: "Item deleted from cart" });
};

// Query: Checkout the cart
exports.checkoutCart = async (req, res, next) => {
  const result = await cartModel.checkoutCart(
    req.validatedCartIdInput.cart_id,
    req.user.user_id,
    req.validatedAddressIdInput.address_id
  );

  // Return the response
  res.status(200).json(result);
};
