// Imports
const Router = require("express-promise-router");
const ordersMiddleware = require("../middleware/orders.middleware");
const ordersController = require("../controllers/orders.controller");

const ordersRouter = new Router();

// Gets all orders
ordersRouter.get("/", ordersController.getAllOrders);

// Gets a specific order
ordersRouter.get(
  "/:orderId",
  ordersMiddleware.validateOrderIdInput,
  ordersController.getOrderById
);

module.exports = ordersRouter;
