import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/categories')({
  component: Categories,
});

function Categories() {
  return <div>Hello "/categories"!</div>;
}
