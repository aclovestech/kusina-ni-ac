// DB (Knex)
const knex = require("../config/db");
// HttpError
const HttpError = require("../utils/HttpError");

// Creates a new cart
exports.createNewCart = async (user_id) => {
  // Query: Create a new cart
  const [returnedData] = await knex("customers.carts").insert(
    { customer_id: user_id },
    ["cart_id", "created_at"]
  );

  // Return the data from the response
  return returnedData;
};

// Adds an item to a specific cart
exports.addItemsToCart = async (cart_id, items) => {
  // Query: Add items to the cart
  const result = await knex("customers.cart_items").insert(
    items.map((item) => ({ cart_id: cart_id, ...item })),
    ["*"]
  );

  // Return the data from the response
  return result;
};

// Gets the items in a specific cart
exports.getCartItemsByCartId = async (cart_id) => {
  // Query: Get the cart items
  const result = await knex("customers.cart_items")
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
  return result.map((item) => {
    return {
      ...item,
      price: Number(item.price),
    };
  });
};

// Updates the quantity of an item in a specific cart
exports.updateCartItemQuantity = async (cart_id, product_id, quantity) => {
  // Query: Update the cart item quantity
  const [returnedData] = await knex("customers.cart_items")
    .update({ quantity: quantity }, ["*"])
    .where("cart_id", cart_id)
    .andWhere("product_id", product_id);

  // Return the data from the response
  return returnedData;
};

// Deletes an item from a specific cart
exports.deleteCartItemByCartIdAndProductId = async (cart_id, product_id) => {
  // Query: Delete the cart item
  await knex("customers.cart_items")
    .del()
    .where("cart_id", cart_id)
    .andWhere("product_id", product_id);
};

// Checkout a specific cart
exports.checkoutCart = async (cart_id, customer_id, address_id) => {
  // Begin transaction
  const result = await knex.transaction(async (trx) => {
    // Query: Get the cart items
    const cartData = await trx("customers.cart_items")
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
    return {
      order_details: { ...order, total_amount: Number(order.total_amount) },
      order_items: cartData.map((item) => {
        return { ...item, price: Number(item.price) };
      }),
    };
  });

  // Return the data from the response
  return result;
};

// Validates if a specific cart belongs to a specific user
exports.validateCartIdByUserId = async (cart_id, user_id) => {
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
};
