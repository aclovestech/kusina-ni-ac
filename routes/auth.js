// Bcrypt
const bcrypt = require("bcrypt");
// Express promise router
const Router = require("express-promise-router");
// Node-postgres (pg)
const db = require("../db/index");
// Passport-related
const passport = require("../utils/passport-config");
// JWT-related
const jwt = require("../utils/jwt");
// HttpError
const HttpError = require("../utils/HttpError");

const authRouter = new Router();

authRouter.post("/register", async (req, res, next) => {
  // Save the req.body as the input
  const { name, email, password } = req.body;

  // Send a 400 status response if the input is incomplete
  if (!name || !email || !password) {
    throw new HttpError("Missing required data", 400);
  }

  // Hash the given password before sending to the database
  const hashedPassword = await hashPassword(password);

  // Establish a new connection to the database since we are going to make a transaction
  const client = await db.getClient();

  // These two variables will be used in our queries
  let query;
  let queryResponse;

  try {
    // Begin transaction
    await client.query("BEGIN");

    // Query: Create a new row for the user
    query = `
    INSERT INTO users.users(name, email, password_hash)
    VALUES ($1, $2, $3)
    `;
    // Response
    queryResponse = await client.query(query, [name, email, hashedPassword]);

    // Query: Create a new unique row for the user (customer details)
    query = `
    INSERT INTO customers.customer_details (customer_id)
    SELECT user_id FROM users.users
    WHERE email = $1
    `;
    // Response
    queryResponse = await client.query(query, [email]);

    // Query: Create a new unique cart for the user
    query = `
    INSERT INTO customers.carts (customer_id)
	    SELECT user_id FROM users.users
	    WHERE email = $1
    `;
    // Response
    queryResponse = await client.query(query, [email]);

    // Commit the transaction if all queries we successful
    await client.query("COMMIT");
  } catch (err) {
    // Rollback the transaction if a query was unsuccessful
    await client.query("ROLLBACK");

    // Throw an error since the transaction was unsuccessful
    console.error(`Transaction error: ${err.message}`);
    err.message = "Invalid request";
    err.statusCode = 400;
    throw err;
  } finally {
    // Release the connection after doing the transaction
    client.release();
  }

  // Query: Get the user_id, email, and created_at
  query = `
    SELECT user_id, email, created_at
    FROM users.users
    WHERE email = $1
    `;
  // Response
  queryResponse = await db.query(query, [email]);

  // Return the newly created user info
  res.status(201).json(queryResponse.rows[0]);
});

authRouter.post(
  "/login",
  // Authenticate the user
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    // Return the token if the user is authenticated
    const token = jwt.generateAccessToken(req.user);
    res.status(201).json({ token });
  }
);

authRouter.get("/test", jwt.authenticateToken, (req, res, next) => {
  res.status(200).json(req.user);
});

async function hashPassword(plaintextPassword) {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plaintextPassword, salt);
}

module.exports = authRouter;
