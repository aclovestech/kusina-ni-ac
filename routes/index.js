// Import all routes here
const auth = require("./auth");
const users = require("./users");
const products = require("./products");
const cart = require("./cart");
const orders = require("./orders");

// JWT
const jwt = require("../utils/jwt");

// Mount all routes together using this function
const mountRoutes = (app) => {
  app.use("/auth", auth);
  app.use("/products", products);
  app.use("/users", jwt.authenticateToken, users);
  app.use("/cart", jwt.authenticateToken, cart);
  app.use("/orders", jwt.authenticateToken, orders);
};

module.exports = mountRoutes;
