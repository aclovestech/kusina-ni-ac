// Passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
// Bcrypt
const bcrypt = require("bcrypt");
// Node-postgres (pg)
const db = require("../db/index");

// Setup local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, cb) => {
      let error = new Error();
      error.statusCode = 400;

      if (!username) {
        error.message = "Invalid request";
        return cb(error, false);
      }

      const checkValidAccountQuery =
        "SELECT customer_id, email, password_hash FROM customers.customers WHERE email = $1";
      const { rows, rowCount } = await db.query(checkValidAccountQuery, [
        username,
      ]);

      if (rowCount === 0) {
        error.message = "No account with the provided email was found";
        return cb(error, false);
      }

      const user = rows[0];
      const hash = user.password_hash;

      if (!hash) {
        error.message = "Invalid password hash";
        return cb(error, false);
      }

      const isPasswordValid = await bcrypt.compare(password, hash);

      if (!isPasswordValid) {
        error.message = "Incorrect password";
        return cb(error, false);
      }

      return cb(null, user);
    }
  )
);

module.exports = passport;
