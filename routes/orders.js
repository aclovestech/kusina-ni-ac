// Express promise router
const Router = require("express-promise-router");
// HttpError
const HttpError = require("../utils/HttpError");
// Joi
const Joi = require("joi");
// DB (Knex)
const { getAllOrders, getOrderById } = require("../db/db-orders");

const ordersRouter = new Router();

// Gets all orders
ordersRouter.get("/", async (req, res, next) => {
  // Query: Get the orders
  const result = await getAllOrders(req.user.user_id);
  // Return the orders
  res.status(200).json(result);
});

// Gets a specific order
ordersRouter.get("/:order_id", async (req, res, next) => {
  // Query: Get the order
  // Return the order details
});

module.exports = ordersRouter;
