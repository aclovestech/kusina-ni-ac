// Express promise router
const Router = require("express-promise-router");
// Node-postgres (pg)
const db = require("../db/index");

const usersRouter = new Router();

module.exports = usersRouter;
