// Imports
const knex = require("../config/db");
const { hashPassword } = require("../utils/bcrypt");

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

// Retrieves the customer's basic data by a given customer ID
exports.getCustomerBasicDataByCustomerId = async (customer_id) => {
  // Query
  const result = await knex("customers")
    .first(basicDataColumns)
    .where("customer_id", customer_id);

  // Return the result
  return result;
};

// Updates the basic data of a specific customer
exports.updateCustomerBasicDataByCustomerId = async (
  customer_id,
  customerData
) => {
  // Hash the password if it exists and delete the password property from the data
  if (customerData.password) {
    customerData.password_hash = await hashPassword(customerData.password);
    delete customerData.password;
  }

  // Add the updated_at to update the timestamp
  customerData.updated_at = knex.fn.now();

  // Query
  const result = await knex("customers")
    .update(customerData, basicDataColumns)
    .where("customer_id", customer_id);

  // Return the data from the response
  return result;
};

// Deletes the customer's account by a given customer ID
exports.deleteCustomerAccountByCustomerId = async (customer_id) => {
  // Query
  return await knex("customers").del().where("customer_id", customer_id);
};
