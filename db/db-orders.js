// DB (Knex)
const knex = require(".");
// HttpError
const HttpError = require("../utils/HttpError");

// Gets all orders of a user
const getAllOrders = async (customer_id) => {
  try {
    // Query: Get the orders
    const orders = await knex("orders.orders")
      .select("*")
      .where("customer_id", customer_id);

    return await Promise.all(
      orders.map(async (order) => {
        const orderItems = await knex("orders.order_items")
          .select(
            {
              product_name: "products.name",
            },
            "order_items.quantity",
            "order_items.price_at_purchase"
          )
          .join(
            "products.products",
            "order_items.product_id",
            "products.product_id"
          )
          .where("order_id", order.order_id);

        const formattedOrderItems = orderItems.map((item) => {
          return {
            product_name: item.product_name,
            quantity: item.quantity,
            base_price: Number(item.price_at_purchase),
            total: item.price_at_purchase * item.quantity,
          };
        });

        return {
          order_details: {
            order_id: order.order_id,
            status: order.status,
            total_amount: Number(order.total_amount),
            created_at: order.created_at,
          },
          order_items: formattedOrderItems,
        };
      })
    );
    // Return the orders
  } catch (err) {
    // Throw an error since the query was unsuccessful
    console.error(`Query error: ${err.message}`);
    throw new HttpError();
  }
};

// Gets a specific order of a user
const getOrderById = async (customer_id, order_id) => {};

module.exports = { getAllOrders, getOrderById };
