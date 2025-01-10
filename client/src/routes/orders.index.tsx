// Imports
import { createFileRoute, Link } from '@tanstack/react-router';
import formatRawDateTime from '../utils/formatRawDateTime';
import { useGetOrders } from '../hooks/useOrdersHooks';
import { Order } from '../api';

export const Route = createFileRoute('/orders/')({
  component: Orders,
});

function Orders() {
  const { data: orders, isPending, isError } = useGetOrders();

  return (
    <>
      <div className="card m-4 bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title self-center">Orders</h2>
          <div className="divider my-0"></div>
          {isPending ? (
            <div className="loading loading-spinner loading-lg self-center"></div>
          ) : isError ? (
            <p className="text-center">
              Unable to retrieve orders, please try again later.
            </p>
          ) : orders ? (
            orders.map((order) => (
              <OrderCard key={order.order_details.order_id} order={order} />
            ))
          ) : (
            <p className="text-center">No orders found.</p>
          )}
        </div>
      </div>
    </>
  );
}

function OrderCard({ order }: { order: Order }) {
  const formattedDateTime = formatRawDateTime(order.order_details.order_date);

  return (
    <>
      <div className="card bg-primary text-primary-content shadow-xl">
        <div className="card-body p-5">
          <div>
            <h2 className="text-sm font-extrabold">
              Order ID - {order.order_details.order_id}
            </h2>
          </div>
          <div className="divider divider-neutral -my-2"></div>
          <div>
            <h2 className="text-sm">
              <span className="font-extrabold">Status:</span>{' '}
              {order.order_details.status}
            </h2>
            <h2 className="text-sm">
              <span className="font-extrabold">Order Date:</span>{' '}
              {formattedDateTime}
            </h2>
            <h3 className="text-sm">
              <span className="font-extrabold">Total Amount:</span> $
              {order.order_details.total_amount.toFixed(2)}
            </h3>
            <div className="divider divider-neutral my-0"></div>
            <div>
              <h3 className="text-sm font-extrabold">Items:</h3>
              {order.order_items.map((item) => {
                return <h2>{`${item.product_name} x ${item.quantity}`}</h2>;
              })}
            </div>
          </div>
          <div className="card-actions justify-center">
            <Link
              to="/orders/$orderId"
              params={{ orderId: order.order_details.order_id }}
              className="btn btn-neutral mt-2"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
