// Imports
const Router = require("express-promise-router");
const ordersController = require("../controllers/orders.controller");
const ordersValidator = require("../validators/orders.validator");
const { checkIsCustomerLoggedIn } = require("../middleware/session.middleware");

const ordersRouter = new Router();

// Middleware that checks if the user is logged in
ordersRouter.use(checkIsCustomerLoggedIn);

// Gets all orders
ordersRouter.get("/", ordersController.handleGetAllOrders);

// Gets a specific order
ordersRouter.get(
  "/:order_id",
  ordersValidator.validateOrderIdInput,
  ordersController.handleGetOrderDetails
);

module.exports = ordersRouter;
