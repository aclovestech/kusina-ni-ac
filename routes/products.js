// Express promise router
const Router = require("express-promise-router");
// Node-postgres (pg)
const db = require("../db/index");

const productsRouter = new Router();

module.exports = productsRouter;
