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

      const userPasswordHashQuery =
        "SELECT password_hash FROM users.users WHERE email = $1";
      const { rows, rowCount } = await db.query(userPasswordHashQuery, [
        username,
      ]);

      if (rowCount === 0) {
        error.message = "No account with the provided email was found";
        return cb(error, false);
      }

      const hash = rows[0].password_hash;

      if (!hash) {
        error.message = "Invalid password hash";
        return cb(error, false);
      }

      const isPasswordValid = await bcrypt.compare(password, hash);

      if (!isPasswordValid) {
        error.message = "Incorrect password";
        return cb(error, false);
      }

      const userDataQuery =
        "SELECT u.user_id, r.name AS role_name, u.first_name, u.last_name, u.email, u.created_at FROM users.users AS u JOIN roles.roles AS r ON u.role_id = r.role_id WHERE email = $1";
      const { rows: userData } = await db.query(userDataQuery, [username]);

      return cb(null, userData[0]);
    }
  )
);

module.exports = passport;
