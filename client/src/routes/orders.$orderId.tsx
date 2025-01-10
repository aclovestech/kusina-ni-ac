// Imports
import { createFileRoute, useParams, Link } from '@tanstack/react-router';
import { useGetOrderById } from '../hooks/useOrdersHooks';
import formatRawDateTime from '../utils/formatRawDateTime';

export const Route = createFileRoute('/orders/$orderId')({
  component: OrderDetails,
});

function OrderDetails() {
  const orderId = useParams({
    from: '/orders/$orderId',
    select: (params) => params.orderId,
  });
  const { data: order, isPending, isError } = useGetOrderById(orderId);

  return (
    <>
      {isPending ? (
        <div className="loading loading-spinner loading-lg self-center"></div>
      ) : isError ? (
        <p className="text-center">
          Unable to retrieve order details, please try again later.
        </p>
      ) : order ? (
        <div className="card m-4 bg-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title self-center">Order Details</h2>
            <div className="divider my-0"></div>
            <h2>Order ID - {order.order_details.order_id}</h2>
            <div>
              <h3>Status: {order.order_details.status}</h3>
              <h3>
                Order Date: {formatRawDateTime(order.order_details.order_date)}
              </h3>
            </div>
            <div>
              <h3>Shipping Address:</h3>
              <p>{order.address_details.address_line1}</p>
              <p>{order.address_details.address_line2}</p>
              <p>{`${order.address_details.city}, ${order.address_details.state}, ${order.address_details.postal_code}`}</p>
              <p>{order.address_details.country}</p>
              <p>{order.address_details.phone_number}</p>
            </div>
            <div>
              <h3>Items:</h3>
              {order.order_items.map((item) => {
                return (
                  <div key={item.product_name} className="mt-3">
                    <p>{`${item.product_name} x ${item.quantity}`}</p>
                    <p>{`(Base Price: $${item.base_price.toFixed(2)})`}</p>
                    <p>{`Subtotal: $${item.subtotal_amount.toFixed(2)}`}</p>
                  </div>
                );
              })}
            </div>
            <h2 className="text-lg text-info">
              Total Amount: ${order.order_details.total_amount.toFixed(2)}
            </h2>
            <Link className="btn btn-outline mt-4" to="/orders">
              Back to Orders
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center">Order not found.</p>
      )}
    </>
  );
}
