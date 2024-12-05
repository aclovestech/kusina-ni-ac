// Express promise router
const Router = require("express-promise-router");

const cartRouter = new Router();

// Creates a new cart
cartRouter.post("/", async (req, res, next) => {});

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

module.exports = cartRouter;
