// Imports
const cartModel = require("../models/cart.model");
const { matchedData } = require("express-validator");
const {
  STRIPE_SECRET_KEY,
  STRIPE_DOMAIN_URL,
  CLIENT_URL,
} = require("../config/environment");
const stripe = require("stripe")(STRIPE_SECRET_KEY);

// Creates a new cart
exports.handleCreateNewCart = async (req, res, next) => {
  const cart = await cartModel.createNewCart(req.user.customer_id);

  // Return the newly created cart
  res.status(201).json(cart);
};

// Retrieves the customer's cart details
exports.handleGetCartDetails = async (req, res, next) => {
  // Get the customer's cart ID
  let cart_id;
  const currentCart = await cartModel.getValidCart(req.user.customer_id);

  // If the cart doesn't exist, create a new one
  if (!currentCart) {
    const cart = await cartModel.createNewCart(req.user.customer_id);
    cart_id = cart.cart_id;
  } else {
    cart_id = currentCart.cart_id;
  }

  // Add the cart ID to the session
  req.session.cart_id = cart_id;

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

// Creates a new Stripe session
exports.handleCreateStripeSession = async (req, res, next) => {
  // Get the address ID
  const { address_id } = matchedData(req);

  // Get the cart items
  const { cart_items: cartItems } = await cartModel.getCartItems(
    req.session.cart_id
  );

  if (!cartItems) {
    throw new Error();
  }

  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: "usd",
      unit_amount: Math.round(item.price * 100),
      product_data: {
        name: item.name,
        description: item.description,
      },
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${STRIPE_DOMAIN_URL}/cart/checkout?sid={CHECKOUT_SESSION_ID}&address_id=${address_id}`,
    cancel_url: `${STRIPE_DOMAIN_URL}/cart/checkout?sid={CHECKOUT_SESSION_ID}`,
  });

  res.json({ url: session.url });
};

// Checks out the cart
exports.handleCheckout = async (req, res, next) => {
  // Get the checkout session ID from the query
  const sid = req.query.sid;

  // Retrieve the session
  const session = await stripe.checkout.sessions.retrieve(sid);

  if (session.payment_status === "unpaid") {
    return res.redirect(CLIENT_URL + "/cart");
  }

  // Get the address ID
  const { address_id } = matchedData(req);

  // Query
  const result = await cartModel.checkoutCart(
    req.session.cart_id,
    req.user.customer_id,
    address_id
  );

  // Return the response
  res.redirect(CLIENT_URL + "/orders/" + result.order_id);
};
