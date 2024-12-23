// Imports
const knex = require("../config/db");

// Gets the most recent cart that is not yet checked out
exports.getValidCart = async (customer_id) => {
  // Query
  return await knex("carts")
    .first("cart_id")
    .where("customer_id", customer_id)
    .andWhere("is_checked_out", false)
    .orderBy("created_at", "desc");
};

// Creates a new cart
exports.createNewCart = async (customer_id) => {
  // Check if the customer has an existing cart that is not yet checked out
  const existingCart = await knex("carts")
    .first()
    .where("customer_id", customer_id)
    .andWhere("is_checked_out", false)
    .orderBy("created_at", "desc");

  if (existingCart) {
    // Return the existing cart
    return existingCart;
  }

  // Query
  const result = await knex("carts").insert({ customer_id: customer_id }, [
    "cart_id",
    "created_at",
  ]);

  // Return the data from the response
  return result[0];
};

// Gets the cart items from the most recent cart that is not yet checked out
exports.getCartItems = async (cart_id) => {
  // Query
  const result = await knex("cart_items")
    .join("carts", "cart_items.cart_id", "carts.cart_id")
    .join("products", "cart_items.product_id", "products.product_id")
    .select(
      "products.product_id",
      "products.name",
      "products.image_url",
      "products.price",
      "cart_items.quantity"
    )
    .where("cart_items.cart_id", cart_id);

  // Return the data from the response
  const cartItems = result.map((item) => {
    return {
      ...item,
      price: Number(item.price),
      quantity: Number(item.quantity),
    };
  });

  return { cart_id: cart_id, cart_items: cartItems };
};

// Adds a product to a cart
exports.addProductToCart = async (cart_id, product_id, quantity) => {
  // Query
  await knex("cart_items").insert({
    cart_id: cart_id,
    product_id: product_id,
    quantity: quantity,
  });

  // Get the product details and return it
  return await getProductDetails(cart_id, product_id);
};

// Updates the quantity of a product in a cart
exports.updateCartItemQuantity = async (cart_id, product_id, quantity) => {
  // Query
  await knex("cart_items")
    .update({ quantity: quantity })
    .where("cart_id", cart_id)
    .andWhere("product_id", product_id);

  // Get the product details and return it
  return await getProductDetails(cart_id, product_id);
};

// Deletes a product from a cart
exports.deleteCartItem = async (cart_id, product_id) => {
  // Query
  return await knex("cart_items")
    .del()
    .where("cart_id", cart_id)
    .andWhere("product_id", product_id);
};

// Checks if the cart belongs to the customer
exports.isCartOwnedByCustomer = async (cart_id, customer_id) => {
  // Query
  const result = await knex("carts")
    .select("cart_id")
    .where("cart_id", cart_id)
    .andWhere("customer_id", customer_id);

  // Return false if the cart doesn't belong to the customer
  if (result.length === 0) {
    return false;
  }

  // Otherwise, return true
  return true;
};

// Gets the product details
async function getProductDetails(cart_id, product_id) {
  // Query
  const productDetails = await knex("cart_items")
    .join("products", "cart_items.product_id", "products.product_id")
    .first(
      "products.product_id",
      "products.name",
      "products.price",
      "cart_items.quantity"
    )
    .where("cart_items.cart_id", cart_id)
    .andWhere("cart_items.product_id", product_id);

  // Return the data from the response
  return {
    ...productDetails,
    price: Number(productDetails.price),
    quantity: Number(productDetails.quantity),
  };
}

// Checkout a specific cart
// exports.checkoutCart = async (cart_id, customer_id, address_id) => {
//   return await knex.transaction(async (trx) => {
//     // Get the cart items
//     const cartData = await trx("cart_items")
//       .join("carts", "cart_items.cart_id", "carts.cart_id")
//       .join("products", "cart_items.product_id", "products.product_id")
//       .select(
//         "cart_items.quantity",
//         "products.name",
//         "products.description",
//         "products.price",
//         "products.product_id"
//       )
//       .where("cart_items.cart_id", cart_id);
//     // Throw an error if the cart is empty
//     if (cartData.length === 0) {
//       return {};
//     }
//     // Calculate the total amount
//     let total_amount = 0;
//     cartData.forEach((item) => {
//       total_amount += item.price * item.quantity;
//     });
//     // Checkout the cart
//     const [order] = await trx("orders").insert(
//       {
//         customer_id: customer_id,
//         address_id: address_id,
//         total_amount: total_amount,
//       },
//       ["*"]
//     );
//     // Get the order ID
//     const order_id = order.order_id;
//     // Add the cart items to the order
//     await trx("order_items").insert(
//       cartData.map((item) => ({
//         order_id: order_id,
//         product_id: item.product_id,
//         quantity: item.quantity,
//         price_at_purchase: item.price,
//       }))
//     );
//     // Return the order data
//     return {
//       order_details: { ...order, total_amount: Number(order.total_amount) },
//       order_items: cartData.map((item) => {
//         return { ...item, price: Number(item.price) };
//       }),
//     };
//   });
// };
