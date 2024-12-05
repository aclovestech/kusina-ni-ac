// DB (Knex)
const knex = require(".");
// HttpError
const HttpError = require("../utils/HttpError");

// Creates a new cart
const createNewCart = async (user_id) => {
  try {
    // Query: Create a new cart
    const [returnedData] = await knex
      .insert({ customer_id: user_id }, ["cart_id", "created_at"])
      .into("customers.carts");

    // Return the data from the response
    return returnedData;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

module.exports = { createNewCart };
