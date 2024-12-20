// Imports
const knex = require("../config/db");

exports.addNewCustomer = async ({
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

  // Return the data from the response
  return result;
};

exports.getCustomerBasicDataByEmail = async (email) => {
  // Query: Get the customer's basic data
  const result = await knex("customers").first().where("email", email);

  // Return the data from the response
  return result;
};

exports.updateCustomerLastLogin = async (customer_id) => {
  // Query: Update the user's last login timestamp
  await knex("customers")
    .update({ last_login: knex.fn.now() })
    .where("customer_id", customer_id);

  // Return when done
  return;
};
