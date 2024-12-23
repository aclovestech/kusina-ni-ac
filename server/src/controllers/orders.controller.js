// Imports
const ordersModel = require("../models/orders.model");
const { matchedData } = require("express-validator");

// Gets all of the orders
exports.handleGetAllOrders = async (req, res, next) => {
  const orders = await ordersModel.getAllOrders(req.user.customer_id);

  // Show a message if there are no orders
  if (orders.length === 0) {
    return res.status(404).json({ message: "No orders found" });
  }

  // Return the orders
  res.status(200).json(orders);
};

// Gets the details of an order
exports.handleGetOrderDetails = async (req, res, next) => {
  // Get the order ID from the validated input
  const { order_id } = matchedData(req);

  const order = await ordersModel.getOrderById(req.user.customer_id, order_id);

  // Show a message if the order was not found
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Return the order details
  res.status(200).json(order);
};
