// Imports
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { comparePasswords } = require("../utils/bcrypt");
const authModel = require("../models/auth.model");

passport.use(
  // Setup local strategy
  new LocalStrategy(
    {
      // Specify the name of the property that you are expecting from the req.body
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      // Find and verify the user
      try {
        // Get the customer's basic data
        const basicData = await authModel.getCustomerBasicDataByEmail(username);

        // Compare the provided password with the hash
        const isPasswordValid = await comparePasswords(
          password,
          basicData.password_hash
        );

        // Return false if the password is invalid
        if (!isPasswordValid) {
          return done(null, false);
        }

        // Return false if the user doesn't exist
        if (!basicData) {
          return done(null, false);
        }

        // Remove the password hash from the data
        delete basicData.password_hash;

        // Update the user's last login timestamp
        await authModel.updateCustomerLastLogin(basicData.customer_id);

        // Return the customer's data
        return done(null, basicData);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // Save the user's ID in the session
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    // Get the customer's basic data
    const basicData = await authModel.getCustomerBasicDataByEmail(email);

    // Return false if the user doesn't exist
    if (!basicData) {
      return done(null, false);
    }

    // Remove the password hash from the data
    delete basicData.password_hash;

    // Return the customer's data
    return done(null, basicData);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
