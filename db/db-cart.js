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

// Adds an item to a specific cart
const addItemsToCart = async (cart_id, items) => {
  try {
    // Query: Add items to the cart
    const result = await knex
      .batchInsert(
        "customers.cart_items",
        items.map((item) => ({ cart_id: cart_id, ...item }))
      )
      .returning("*");

    // Return the data from the response
    return result;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Validates if a specific cart belongs to a specific user
const validateCartIdByUserId = async (cart_id, user_id) => {
  try {
    // Query: Check if the cart belongs to the user
    const [returnedData] = await knex("customers.carts")
      .select("cart_id", "customer_id")
      .where("cart_id", cart_id)
      .andWhere("customer_id", user_id);

    // Return false if the cart doesn't belong to the user
    if (!returnedData) {
      return false;
    }

    // Otherwise, return true
    return true;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

module.exports = { createNewCart, addItemsToCart, validateCartIdByUserId };
