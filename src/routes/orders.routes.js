// Express promise router
const Router = require("express-promise-router");
// DB (Knex)
const { getAllOrders, getOrderById } = require("../models/orders.model");
// Validations
const { validateOrderIdInput } = require("../middleware/orders.middleware");

const ordersRouter = new Router();

// Gets all orders
ordersRouter.get("/", async (req, res, next) => {
  // Query: Get the orders
  const result = await getAllOrders(req.user.user_id);
  // Return the orders
  res.status(200).json(result);
});

// Gets a specific order
ordersRouter.get("/:orderId", validateOrderIdInput, async (req, res, next) => {
  // Query: Get the order
  const result = await getOrderById(
    req.user.user_id,
    req.validatedOrderIdInput.order_id
  );

  // Return the order details
  res.status(200).json(result);
});

module.exports = ordersRouter;
