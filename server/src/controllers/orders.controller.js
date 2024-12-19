// Imports
const ordersModel = require("../models/orders.model");

// Query: Get the orders
exports.getAllOrders = async (req, res, next) => {
  const result = await ordersModel.getAllOrders(req.user.user_id);

  // Return the orders
  res.status(200).json(result);
};

// Query: Get the order
exports.getOrderById = async (req, res, next) => {
  const result = await ordersModel.getOrderById(
    req.user.user_id,
    req.validatedOrderIdInput.order_id
  );

  // Return the order details
  res.status(200).json(result);
};
