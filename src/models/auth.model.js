// DB (Knex)
const knex = require("../config/db");

// Used for registering a new user
exports.insertUser = async (userDetails) => {
  // Begin Transaction
  const result = await knex.transaction(async (trx) => {
    // Insert a row within the users.users table with the required data
    const [returnedData] = await trx("users.users").insert(
      {
        name: userDetails.name,
        email: userDetails.email,
        password_hash: userDetails.password_hash,
        role_id: userDetails.role_id,
      },
      ["user_id", "email", "created_at", "role_id"]
    );

    // If the user is a customer
    if (userDetails.role === "customer") {
      // After the user is created, get the returned user_id and insert a row within the customers.customer_details table
      await trx("customers.customer_details").insert({
        customer_id: returnedData.user_id,
      });
    }

    // If the user is a seller
    else if (userDetails.role === "seller") {
      // After the user is created, get the returned user_id and insert a row within the sellers.seller_details table
      await trx("sellers.seller_details").insert({
        seller_id: returnedData.user_id,
      });
    }

    // Return back the result
    return returnedData;
  });

  // Return the result if the transaction was successful
  return result;
};

// Get the user's password hash
exports.getUserPasswordHash = async (email) => {
  // Query: Get the password hash
  const [returnedData] = await knex("users.users")
    .select("password_hash")
    .where("email", email);

  // Return the data from the response
  return returnedData;
};

// Get the user's login data
exports.getUserLoginData = async (email) => {
  // Query: Get the user data that will be put into the JWT
  const [returnedData] = await knex("users.users")
    .join("roles.roles", "users.role_id", "roles.role_id")
    .select(
      "users.user_id",
      { role_name: "roles.name" },
      "users.name",
      "users.email",
      "users.created_at"
    )
    .where("users.email", email);

  // Update the user's last login time
  await knex("users.users")
    .update({ last_login: knex.fn.now() })
    .where("users.user_id", returnedData.user_id);

  // Return the data from the response
  return returnedData;
};
