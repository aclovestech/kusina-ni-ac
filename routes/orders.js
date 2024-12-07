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
ordersRouter.get("/:orderId", async (req, res, next) => {
  // Specify joi schema
  const schema = Joi.object({
    order_id: Joi.string().uuid().required(),
  });

  // Validate the input
  const { value, error } = schema.validate({
    order_id: req.params.orderId,
  });

  // Throw an error if there's an error
  if (error) {
    throw new HttpError("Invalid input data", 400);
  }

  // Query: Get the order
  const result = await getOrderById(req.user.user_id, value.order_id);

  // Return the order details
  res.status(200).json(result);
});

module.exports = ordersRouter;
