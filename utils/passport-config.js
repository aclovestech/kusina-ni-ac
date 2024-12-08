// Passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
// HttpError
const HttpError = require("./HttpError");
// Validations
const { validateLoginInput } = require("./validations/auth");
// DB (Knex)
const { getUserPasswordHash, getUserLoginData } = require("../db/db-auth");

// Setup local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, cb) => {
      // Validate the input
      const value = validateLoginInput(username, password);

      if (!value) {
        return cb(new HttpError("Invalid request", 400), false);
      }

      try {
        // Get the hash from the response and compare it with the provided password
        const result = await getUserPasswordHash(value.email);

        // Throw an error if the user is not found
        if (!result) {
          return cb(new HttpError("User not found", 400), false);
        }

        // Bcrypt
        const bcrypt = require("bcrypt");

        // Compare the provided password with the hash
        const isPasswordValid = await bcrypt.compare(
          password,
          result.password_hash
        );

        // Throw an error if the provided password is incorrect
        if (!isPasswordValid) {
          return cb(new HttpError("Incorrect password", 400), false);
        }

        // Get the user's login data
        const returnedData = await getUserLoginData(value.email, cb);

        // Return the data from the response
        return cb(null, returnedData);
      } catch (err) {
        // Throw an error if anything goes wrong
        console.error(err.message);
        return cb(new HttpError(), false);
      }
    }
  )
);

module.exports = passport;
