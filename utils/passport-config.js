// Passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
// Bcrypt
const bcrypt = require("bcrypt");
// HttpError
const HttpError = require("./HttpError");
// Joi
const Joi = require("joi");
// DB (Knex)
const { getUserPasswordHash, getUserLoginData } = require("../db/db");

// Setup local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, cb) => {
      // Specify joi schema
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });

      // Validate the input
      const { value, error } = schema.validate({
        email: username,
        password: password,
      });

      // Throw an error if there's no email provided
      if (error) {
        return cb(new HttpError("Invalid request", 400), false);
      }

      try {
        // Get the hash from the response and compare it with the provided password
        const result = await getUserPasswordHash(value.email, cb);

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
        await getUserLoginData(value.email, cb);
      } catch (err) {
        // Throw an error if anything goes wrong
        console.error(`Login error: ${err.message}`);
        return cb(new HttpError(), false);
      }
    }
  )
);

module.exports = passport;
