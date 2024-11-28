// Import all routes here
const auth = require("./auth");
const users = require("./users");
const products = require("./products");
const cart = require("./cart");
const orders = require("./orders");

// Mount all routes together using this function
const mountRoutes = (app) => {
  // Example: app.use('/users', users)
  app.use("/auth", auth);
  app.use("/users", users);
  app.use("/products", products);
  app.use("/cart", cart);
  app.use("/orders", orders);
};

module.exports = mountRoutes;
