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

// Gets the items in a specific cart
const getCartItemsByCartId = async (cart_id) => {
  try {
    // Query: Get the cart items
    const result = knex
      .from("customers.cart_items")
      .join("customers.carts", "cart_items.cart_id", "carts.cart_id")
      .join("products.products", "cart_items.product_id", "products.product_id")
      .select(
        "cart_items.quantity",
        "products.name",
        "products.description",
        "products.price",
        "products.product_id"
      )
      .where("cart_items.cart_id", cart_id);

    // Return the data from the response
    return result;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Updates the quantity of an item in a specific cart
const updateCartItemQuantity = async (cart_id, product_id, quantity) => {
  try {
    // Query: Update the cart item quantity
    const [returnedData] = await knex("customers.cart_items")
      .update({ quantity: quantity }, ["*"])
      .where("cart_id", cart_id)
      .andWhere("product_id", product_id);

    // Return the data from the response
    return returnedData;
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Deletes an item from a specific cart
const deleteCartItemByCartIdAndProductId = async (cart_id, product_id) => {
  try {
    // Query: Delete the cart item
    await knex("customers.cart_items")
      .del()
      .where("cart_id", cart_id)
      .andWhere("product_id", product_id);
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Checkout a specific cart
const checkoutCart = async (cart_id, customer_id, address_id) => {
  try {
    // Begin transaction
    return await knex.transaction(async (trx) => {
      // Query: Get the cart items
      const cartData = await trx("customers.carts")
        .from("customers.cart_items")
        .join("customers.carts", "cart_items.cart_id", "carts.cart_id")
        .join(
          "products.products",
          "cart_items.product_id",
          "products.product_id"
        )
        .select(
          "cart_items.quantity",
          "products.name",
          "products.description",
          "products.price",
          "products.product_id"
        )
        .where("cart_items.cart_id", cart_id);

      // Throw an error if the cart is empty
      if (cartData.length === 0) {
        throw new HttpError("Cart is empty", 400);
      }

      // Calculate the total amount
      let total_amount = 0;
      cartData.forEach((item) => {
        total_amount += item.price * item.quantity;
      });

      // Query: Checkout the cart
      const [order] = await trx("orders.orders").insert(
        {
          customer_id: customer_id,
          address_id: address_id,
          total_amount: total_amount,
        },
        ["*"]
      );

      // Query: Get the order ID
      const order_id = order.order_id;

      // Query: Add the cart items to the order
      await trx("orders.order_items").insert(
        cartData.map((item) => ({
          order_id: order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          price_at_purchase: item.price,
        }))
      );

      // Return the order data
      return { order_details: order, order_items: cartData };
    });
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

module.exports = {
  createNewCart,
  addItemsToCart,
  validateCartIdByUserId,
  getCartItemsByCartId,
  updateCartItemQuantity,
  deleteCartItemByCartIdAndProductId,
  checkoutCart,
};
