// Imports
const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { comparePasswords } = require("../utils/bcrypt");
const authModel = require("../models/auth.model");
const env = require("./environment");

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
        const { password_hash } =
          await authModel.getCustomerPasswordHashByEmail(username);

        if (!password_hash) {
          return done(null, false);
        }

        // Compare the provided password with the hash
        const isPasswordValid = await comparePasswords(password, password_hash);

        // Return false if the password is invalid
        if (!isPasswordValid) {
          return done(null, false);
        }

        // Get the customer's basic data
        const basicData = await authModel.getCustomerBasicDataByEmail(
          username,
          "local"
        );

        // Return the customer's data
        return done(null, basicData);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: ["profile", "email"],
      state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const provider = profile.provider;
      const provider_id = profile.id;
      const email = profile.emails[0].value;
      const first_name = profile.name.givenName;
      const last_name = profile.name.familyName;

      // Find and verify the user
      try {
        // Get the customer's basic data
        const basicData = await authModel.getCustomerBasicDataByEmail(
          email,
          provider
        );

        // If the user doesn't exist, register the user
        if (!basicData) {
          const newCustomer = await authModel.addNewCustomerThirdParty({
            provider: provider,
            provider_id: provider_id,
            email: email,
            first_name: first_name,
            last_name: last_name,
          });

          // Return the newly created user
          return done(null, newCustomer);
        }

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
  done(null, user.customer_id);
});

passport.deserializeUser(async (customer_id, done) => {
  try {
    // Get the customer's basic data
    const basicData =
      await authModel.getCustomerBasicDataByCustomerId(customer_id);

    // Return false if the user doesn't exist
    if (!basicData) {
      return done(null, false);
    }

    // Return the customer's data
    return done(null, basicData);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
