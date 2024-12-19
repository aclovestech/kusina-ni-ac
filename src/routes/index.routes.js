// Import all routes here
const auth = require("./auth.routes");
const users = require("./users.routes");
const products = require("./products.routes");
const cart = require("./cart.routes");
const orders = require("./orders.routes");

// JWT
const jwt = require("../utils/jwt");

// Validations
const { validateIsUserACustomer } = require("../middleware/general.middleware");

// Mount all routes together using this function
const mountRoutes = (app) => {
  app.use("/auth", auth);
  app.use("/products", products);
  app.use("/users", jwt.authenticateToken, users);
  app.use("/cart", jwt.authenticateToken, validateIsUserACustomer, cart);
  app.use("/orders", jwt.authenticateToken, validateIsUserACustomer, orders);
};

module.exports = mountRoutes;
