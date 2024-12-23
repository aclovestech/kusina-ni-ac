// Imports
const knex = require("../config/db");

// Constants
const ORDERS_QUERY_SELECTION = [
  "customer_addresses.address_line1",
  "customer_addresses.address_line2",
  "customer_addresses.city",
  "customer_addresses.state",
  "customer_addresses.postal_code",
  "customer_addresses.country",
  "customer_addresses.phone_number",
  "orders.*",
];

// Gets all orders of a customer
exports.getAllOrders = async (customer_id) => {
  // Query
  const orders = await knex("orders")
    .select(ORDERS_QUERY_SELECTION)
    .join(
      "customer_addresses",
      "orders.address_id",
      "customer_addresses.address_id"
    )
    .where("orders.customer_id", customer_id);

  if (orders.length === 0) {
    return [];
  }

  // Return the orders
  return await Promise.all(
    orders.map(async (order) => {
      // Get the order items
      const orderDetails = await getOrderDetails(order.order_id);

      // Return the formatted the order items
      return formatOrderDetails(order, orderDetails);
    })
  );
};

// Gets a specific order of a customer
exports.getOrderById = async (customer_id, order_id) => {
  const order = await knex("orders")
    .first(ORDERS_QUERY_SELECTION)
    .join(
      "customer_addresses",
      "orders.address_id",
      "customer_addresses.address_id"
    )
    .where("orders.customer_id", customer_id)
    .andWhere("orders.order_id", order_id);

  if (!order) {
    return null;
  }

  // Get the order items
  const orderDetails = await getOrderDetails(order_id);

  // Return the formatted the order items
  return formatOrderDetails(order, orderDetails);
};

async function getOrderDetails(order_id) {
  return await knex("order_items")
    .select(
      "products.name",
      "products.image_url",
      "order_items.quantity",
      "order_items.price_at_purchase"
    )
    .join("products", "order_items.product_id", "products.product_id")
    .where("order_items.order_id", order_id);
}

function formatOrderDetails(order, orderItems) {
  const formattedOrderItems = orderItems.map((item) => {
    return {
      product_name: item.name,
      product_image_url: item.image_url,
      quantity: Number(item.quantity),
      base_price: Number(item.price_at_purchase),
      subtotal_amount: Number(item.price_at_purchase * item.quantity),
    };
  });

  const totalAmount = formattedOrderItems.reduce(
    (total, item) => total + item.subtotal_amount,
    0
  );

  return {
    order_details: {
      order_id: order.order_id,
      status: order.status,
      total_amount: Number(totalAmount),
      order_date: order.order_date,
      updated_at: order.updated_at,
    },
    address_details: {
      address_line1: order.address_line1,
      address_line2: order.address_line2,
      city: order.city,
      state: order.state,
      postal_code: order.postal_code,
      country: order.country,
      phone_number: order.phone_number,
    },
    order_items: formattedOrderItems,
  };
}
