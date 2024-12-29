import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/menu')({
  component: Menu,
});

function Menu() {
  return <div>Hello "/menu"!</div>;
}
