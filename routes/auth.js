// Express promise router
const Router = require("express-promise-router");
// Node-postgres (pg)
const db = require("../db/index");

const authRouter = new Router();

module.exports = authRouter;
