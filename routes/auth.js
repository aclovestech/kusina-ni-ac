// Bcrypt
const bcrypt = require("bcrypt");
// Express promise router
const Router = require("express-promise-router");
// Node-postgres (pg)
const db = require("../db/index");
// Get the input validator from utils
const utils = require("../utils/utils");
// Passport-related
const passport = require("../utils/passport-config");
// JWT-related
const jwt = require("../utils/jwt");

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
    const error = new Error("Missing required data");
    error.statusCode = 400;
    throw error;
  }

  // Hash the given password before sending to the database
  const hashedPassword = await hashPassword(input.password);

  // DB query
  const client = await db.getClient();

  try {
    await client.query("BEGIN");

    const checkEmailQuery = "SELECT COUNT(*) FROM users.users WHERE email = $1";
    const { rows: queryEmailResponse } = await client.query(checkEmailQuery, [
      input.email,
    ]);

    if (parseInt(queryEmailResponse[0].count) > 0) {
      throw new Error("Email already exists");
    }

    const insertQuery =
      "INSERT INTO users.users(first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4)";
    await client.query(insertQuery, [
      input.first_name,
      input.last_name,
      input.email,
      hashedPassword,
    ]);

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    err.statusCode = 400;
    throw err;
  } finally {
    client.release();
  }

  const getInsertedRowQuery =
    "SELECT user_id, email, created_at FROM users.users WHERE email = $1";
  const { rows: queryGetInsertedRowResponse } = await db.query(
    getInsertedRowQuery,
    [input.email]
  );
  res.status(201).json(queryGetInsertedRowResponse[0]);
});

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
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
