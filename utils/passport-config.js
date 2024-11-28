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
      if (!username) {
        return cb(null, false, { message: "Invalid request" });
      }

      const query = {
        text: "SELECT customer_id, email, password_hash FROM customers.customers WHERE email = $1",
        values: [username],
      };

      const queryResult = await db.query(query);

      if (queryResult.rowCount === 0) {
        return cb(null, false, {
          message: "No account with the provided email was found",
        });
      }

      const user = queryResult.rows[0];
      const hash = user.password_hash;

      if (!hash) {
        return cb(null, false, { message: "Invalid password hash" });
      }

      const isPasswordValid = await bcrypt.compare(password, hash);

      if (!isPasswordValid) {
        return cb(null, false, { message: "Incorrect password" });
      }

      return cb(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log(user);
  cb(null, user);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const query = {
      text: "SELECT customer_id, email, FROM customers.customers WHERE customer_id = $1",
      values: [id],
    };

    const queryResult = await db.query(query);

    if (queryResult.rowCount !== 0) {
      return cb(null, queryResult.rows[0]);
    }
  } catch (err) {
    cb(err);
  }
});

module.exports = passport;
