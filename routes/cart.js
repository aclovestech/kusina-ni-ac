// Express promise router
const Router = require("express-promise-router");
// HttpError
const HttpError = require("../utils/HttpError");
// DB (Knex)
const { createNewCart } = require("../db/db-cart");

const cartRouter = new Router();

// Creates a new cart
cartRouter.post("/", checkUserAuthorization, async (req, res, next) => {
  // Query: Create a new cart
  const result = await createNewCart(req.user.user_id);

  // Return the newly created cart
  res.status(201).json(result);
});

// Gets a specific cart
cartRouter.get("/:cartId", async (req, res, next) => {});

// Adds an item to a specific cart
cartRouter.post("/:cartId", async (req, res, next) => {});

// Updates the quantity of an item in a specific cart
cartRouter.put("/:cartId/:productId", async (req, res, next) => {});

// Deletes an item from a specific cart
cartRouter.delete("/:cartId/:productId", async (req, res, next) => {});

// Checks out a specific cart
cartRouter.post("/:cartId/checkout", async (req, res, next) => {});

// Checks if the user is a customer or an admin
function checkUserAuthorization(req, res, next) {
  // Get the role_id from the JWT
  const { role_name } = req.user;

  // Throw an error if the user is not a customer
  if (role_name !== "Customer") {
    throw new HttpError("Unauthorized", 401);
  }

  // Move to the next middleware
  next();
}

module.exports = cartRouter;
