// Bcrypt
const bcrypt = require("bcrypt");
// Express promise router
const Router = require("express-promise-router");
// Node-postgres (pg)
const db = require("../db/index");
// Get the input validator from utils
const utils = require("../utils/utils");

const authRouter = new Router();

authRouter.post("/register", async (req, res, next) => {
  // Save the req.body as the input
  const input = req.body;
  // Check if the required data from the input is complete
  const requiredData = ["first_name", "last_name", "email", "password"];
  const isRequiredInputDataComplete = utils.isRequiredInputDataComplete(
    input,
    requiredData
  );
  // If there's something missing from within the input, send a 400 status response.
  if (!isRequiredInputDataComplete) {
    const error = new Error("Bad request: Missing required data");
    error.statusCode = 400;
    throw error;
  }

  // Hash the given password before sending to the database
  const hashedPassword = await hashPassword(input.password);

  // Build the query
  const query = {
    text: "SELECT * FROM customers.register_customer($1, $2, $3, $4)",
    values: [input.first_name, input.last_name, input.email, hashedPassword],
  };

  try {
    // Run the query
    const queryResult = await db.query(query);
  } catch (err) {
    const error = new Error("Email must be unique.");
    error.statusCode = 400;
    throw error;
  }

  // Return back the result if the query was successful
  if (queryResult.rowCount > 0) {
    res.status(201).json(queryResult.rows[0]);
  } else {
    throw new Error();
  }
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
