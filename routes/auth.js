// Bcrypt
const bcrypt = require("bcrypt");
// Express promise router
const Router = require("express-promise-router");
// Node-postgres (pg)
const db = require("../db/index");
// Input validator
const utils = require("../utils/utils");

const authRouter = new Router();

authRouter.post("/register", async (req, res, next) => {
  // insert logic here
});

authRouter.post("/login", async (req, res, next) => {
  // insert login logic here
});

async function hashPassword(plaintextPassword) {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plaintextPassword, salt);
}

async function isPasswordValid(plaintextPassword, hash) {
  return await bcrypt.compare(plaintextPassword, hash);
}

module.exports = authRouter;
