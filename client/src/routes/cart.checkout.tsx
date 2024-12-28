import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cart/checkout')({
  component: CartCheckout,
});

function CartCheckout() {
  return <div>Hello "/cart/checkout"!</div>;
}
