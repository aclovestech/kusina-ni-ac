// Imports
const knex = require("../config/db");

exports.insertCustomer = async ({
  email,
  first_name,
  last_name,
  password_hash,
}) => {
  // Query: Create a new row for the customer
  const result = await knex("customers").insert(
    {
      email: email,
      first_name: first_name,
      last_name: last_name,
      password_hash: password_hash,
    },
    ["customer_id", "email", "created_at"]
  );

  // Return the result
  return result;
};

exports.selectCustomerPasswordHash = async (email) => {
  // Query: Get the password hash
  const [returnedData] = await knex("customers")
    .select("password_hash")
    .where("email", email);

  // Return the data from the response
  return returnedData;
};

exports.selectCustomerLoginData = async (email) => {
  // Query: Get the user data that will be put into the JWT
  const [returnedData] = await knex("customers")
    .select("customer_id", "first_name", "last_name", "email", "created_at")
    .where("email", email);

  // Update the user's last login time
  await knex("customers")
    .update({ last_login: knex.fn.now() })
    .where("customer_id", returnedData.customer_id);

  // Return the data from the response
  return returnedData;
};
