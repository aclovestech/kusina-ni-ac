import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/orders/$orderId')({
  component: OrderDetails,
});

function OrderDetails() {
  return <div>Hello "/orders/$orderId"!</div>;
}
