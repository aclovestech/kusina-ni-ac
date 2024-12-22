// Imports
const cartModel = require("../models/cart.model");
const { matchedData } = require("express-validator");

// Creates a new cart
exports.handleCreateNewCart = async (req, res, next) => {
  const cart = await cartModel.createNewCart(req.user.customer_id);

  // Return the newly created cart
  res.status(201).json(cart);
};

// Retrieves the customer's cart details
exports.handleGetCartDetails = async (req, res, next) => {
  const cart = await cartModel.getCartItems(req.session.cart_id);

  // Return the cart
  res.status(200).json(cart);
};

// Adds items to the cart
exports.handleAddProductsToCart = async (req, res, next) => {
  // Get the validated input
  const { product_id, quantity } = matchedData(req);

  const product = await cartModel.addProductToCart(
    req.session.cart_id,
    product_id,
    quantity
  );

  // Return the updated cart
  res.status(201).json(product);
};

// Updates the quantity of an item within the cart
exports.handleUpdateCartItem = async (req, res, next) => {
  // Get the validated input
  const { product_id, quantity } = matchedData(req);

  const product = await cartModel.updateCartItemQuantity(
    req.session.cart_id,
    product_id,
    quantity
  );

  // Return the updated cart
  res.status(200).json(product);
};

// Deletes an item from the cart
exports.handleDeleteCartItem = async (req, res, next) => {
  // Get the validated input
  const { product_id } = matchedData(req);

  await cartModel.deleteCartItem(req.session.cart_id, product_id);

  // Return that the item was successfully deleted
  res
    .status(200)
    .json({ success: true, message: "Item successfully deleted from cart" });
};

// Checks out the cart
exports.handleCheckout = async (req, res, next) => {
  const result = await cartModel.checkoutCart(req.session.cart_id);

  // Return the response
  res.status(200).json(result);
};
