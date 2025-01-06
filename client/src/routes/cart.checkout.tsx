import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cart/checkout')({
  component: CartCheckout,
});

function CartCheckout() {
  return <div>Hello "/cart/checkout"!</div>;
}

// Checkout

// 1-2-3
// Shipping
// Payment
// Review

// Shipping
// Contact Information
// {email} We'll send order updates to this email.

// Select a shipping address

// Review
// Review your order
// Please double-check your details before placing your order.
// Shipping Address
// Payment

// Place Order
