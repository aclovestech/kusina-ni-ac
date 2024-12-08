// DB (Knex)
const knex = require(".");

// Gets all orders of a user
const getAllOrders = async (customer_id) => {
  // Query: Get the orders
  const orders = await knex("orders.orders")
    .select("*")
    .where("customer_id", customer_id);

  // Return the orders
  return await Promise.all(
    orders.map(async (order) => {
      // Query: Get the order items
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
        .where("order_items.order_id", order.order_id);

      // Format the order items
      const formattedOrderItems = orderItems.map((item) => {
        return {
          product_name: item.product_name,
          quantity: item.quantity,
          base_price: Number(item.price_at_purchase),
          total: item.price_at_purchase * item.quantity,
        };
      });

      // Return the orders
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
};

// Gets a specific order of a user
const getOrderById = async (customer_id, order_id) => {
  // Query: Get the order
  const [order] = await knex("orders.orders")
    .select("*")
    .where("customer_id", customer_id)
    .andWhere("order_id", order_id);

  // Query: Get the order items
  const orderItems = await knex("orders.order_items")
    .select(
      {
        product_name: "products.name",
      },
      "order_items.quantity",
      "order_items.price_at_purchase"
    )
    .join("products.products", "order_items.product_id", "products.product_id")
    .where("order_items.order_id", order_id);

  // Format the order items
  const formattedOrderItems = orderItems.map((item) => {
    return {
      product_name: item.product_name,
      quantity: item.quantity,
      base_price: Number(item.price_at_purchase),
      total: item.price_at_purchase * item.quantity,
    };
  });

  // Return the order
  return {
    order_details: {
      order_id: order.order_id,
      status: order.status,
      total_amount: Number(order.total_amount),
      created_at: order.created_at,
    },
    order_items: formattedOrderItems,
  };
};

module.exports = { getAllOrders, getOrderById };
