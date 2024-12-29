// Imports
import { createFileRoute } from '@tanstack/react-router';
import { Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/menu')({
  component: Menu,
});

function Menu() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4 md:gap-2">
        <Link className="btn btn-outline">All</Link>
        <Link className="btn btn-outline">Category 1</Link>
        <Link className="btn btn-outline">Category 2</Link>
        <Link className="btn btn-outline">Category 3</Link>
        <Link className="btn btn-outline">Category 4</Link>
        <Link className="btn btn-outline">Category 5</Link>
        <Link className="btn btn-outline">Category 6</Link>
        <Link className="btn btn-outline">Category 7</Link>
      </div>
      <div className="divider my-0"></div>
      <Outlet />
    </>
  );
}
