import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cart/checkout')({
  component: RouteComponent,
});

function RouteComponent() {
  return <></>;
}
