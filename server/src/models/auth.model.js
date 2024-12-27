// Imports
const knex = require("../config/db");

const basicDataColumns = [
  "customer_id",
  "email",
  "first_name",
  "last_name",
  "date_of_birth",
  "loyalty_points",
  "created_at",
  "updated_at",
  "last_login",
];

exports.addNewCustomerLocal = async ({
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
      provider: "local",
    },
    basicDataColumns
  );

  // Return the data from the response
  return result[0];
};

exports.addNewCustomerThirdParty = async ({
  provider,
  provider_id,
  email,
  first_name,
  last_name,
}) => {
  // Query: Create a new row for the customer
  const result = await knex("customers").insert(
    {
      provider: provider,
      provider_id: provider_id,
      email: email,
      first_name: first_name,
      last_name: last_name,
    },
    basicDataColumns
  );

  // Return the data from the response
  return result[0];
};

exports.getCustomerBasicDataByEmail = async (email, provider) => {
  // Query: Get the customer's basic data
  const result = await knex("customers")
    .first(basicDataColumns)
    .where("email", email)
    .andWhere("provider", provider);

  // Return the data from the response
  return result;
};

exports.getCustomerBasicDataByCustomerId = async (customer_id) => {
  // Query: Get the customer's basic data
  const result = await knex("customers")
    .first(basicDataColumns)
    .where("customer_id", customer_id);

  // Return the data from the response
  return result;
};

exports.getCustomerPasswordHashByEmail = async (email) => {
  // Query: Get the customer's password hash
  const result = await knex("customers")
    .first("password_hash")
    .where("email", email);

  // Return the data from the response
  return result;
};

exports.updateCustomerLastLogin = async (customer_id) => {
  // Query: Update the user's last login timestamp
  return await knex("customers")
    .update({ last_login: knex.fn.now() })
    .where("customer_id", customer_id);
};
