// DB (Knex)
const knex = require(".");
// HttpError
const HttpError = require("../utils/HttpError");

// Used for registering a new user
const insertUser = async (userDetails) => {
  try {
    // Begin Transaction
    const result = await knex.transaction(async (trx) => {
      // Insert a row within the users.users table with the required data
      const [returnedData] = await trx
        .insert({
          name: userDetails.name,
          email: userDetails.email,
          password_hash: userDetails.password_hash,
          role_id: userDetails.role_id,
        })
        .into("users.users")
        .returning(["user_id", "email", "created_at", "role_id"]);

      // If the user is a customer
      if (userDetails.role === "customer") {
        // After the user is created, get the returned user_id and insert a row within the customers.customer_details table
        await trx
          .insert({ customer_id: returnedData.user_id })
          .into("customers.customer_details");
        // After that insert a row within the customers.carts table
        await trx
          .insert({ customer_id: returnedData.user_id })
          .into("customers.carts");
      }

      // If the user is a seller
      else if (userDetails.role === "seller") {
        // After the user is created, get the returned user_id and insert a row within the sellers.seller_details table
        await trx
          .insert({ seller_id: returnedData.user_id })
          .into("sellers.seller_details");
      }

      // Return back the result
      return returnedData;
    });

    // Return the result if the transaction was successful
    return result;
  } catch (err) {
    // Throw an error since the transaction was unsuccessful
    console.error(`Transaction error: ${err.message}`);
    throw new HttpError();
  }
};

// Get the user's password hash
const getUserPasswordHash = async (email, cb) => {
  try {
    // Query: Get the password hash
    const [returnedData] = await knex("users.users")
      .select("password_hash")
      .where("email", email);

    // Throw an error if the user is not found
    if (!returnedData) {
      return cb(new HttpError("User not found", 400), false);
    }

    // Return the password hash
    return returnedData;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Get the user's login data
const getUserLoginData = async (email, cb) => {
  try {
    // Query: Get the user data that will be put into the JWT
    const [returnedData] = await knex("users.users")
      .join("roles.roles", "users.role_id", "=", "roles.role_id")
      .select(
        "users.user_id",
        { role_name: "roles.name" },
        "users.name",
        "users.email",
        "users.created_at"
      )
      .where("users.email", email);

    // Return the data from the response
    return cb(null, returnedData);
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

module.exports = {
  insertUser,
  getUserPasswordHash,
  getUserLoginData,
};
