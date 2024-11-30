// Passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
// Bcrypt
const bcrypt = require("bcrypt");
// Node-postgres (pg)
const db = require("../db/index");
// HttpError
const HttpError = require("./HttpError");

// Setup local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, cb) => {
      // Throw an error if there's no email provided
      if (!username) {
        return cb(new HttpError("Invalid request", 400), false);
      }

      // These two variables will be used in our queries
      let query;
      let queryResponse;

      // Query:
      query = `
      SELECT password_hash
      FROM users.users 
      WHERE email = $1
      `;
      // Response
      queryResponse = await db.query(query, [username]);

      // Throw an error when the response is empty
      if (queryResponse.rowCount === 0) {
        return cb(
          new HttpError("No account with the provided email was found", 400),
          false
        );
      }

      // Get the hash from the response and compare it with the provided password
      const hash = queryResponse.rows[0].password_hash;
      const isPasswordValid = await bcrypt.compare(password, hash);

      // Throw an error if the provided password is incorrect
      if (!isPasswordValid) {
        return cb(new HttpError("Incorrect password", 400), false);
      }

      try {
        // Query: Get the user data that will be put into the JWT
        query = `
        SELECT u.user_id, r.name AS role_name, u.name, u.email, u.created_at
        FROM users.users AS u 
        JOIN roles.roles AS r 
            ON u.role_id = r.role_id
        WHERE email = $1`;
        // Response
        queryResponse = await db.query(query, [username]);

        // Return the data from the response
        return cb(null, queryResponse.rows[0]);
      } catch (err) {
        console.error(`Query error: ${err.message}`);
        return cb(new HttpError());
      }
    }
  )
);

module.exports = passport;
