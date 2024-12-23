// Imports
const auth = require("./auth.routes");
const users = require("./users.routes");
const products = require("./products.routes");
const cart = require("./cart.routes");
const orders = require("./orders.routes");

// Mount all routes together using this function
const mountRoutes = (app) => {
  app.use("/auth", auth);
  app.use("/products", products);
  app.use("/users", users);
  app.use("/cart", cart);
  app.use("/orders", orders);
};

module.exports = mountRoutes;
