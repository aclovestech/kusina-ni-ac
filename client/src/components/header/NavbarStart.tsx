// Imports
import { NavMenuList } from './NavMenuList';
import { AlignLeft } from 'lucide-react';

export default function NavbarStart() {
  return (
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
          <AlignLeft />
        </div>
        <h1 className="hidden h-12 min-h-12 flex-shrink-0 items-center justify-center pl-4 pr-4 text-center text-xl font-extrabold md:inline-flex">
          Kusina ni AC
        </h1>
        <ul
          tabIndex={0}
          className="menu dropdown-content menu-sm z-50 mt-3 w-44 rounded-box bg-base-200 p-2 shadow"
        >
          <NavMenuList />
        </ul>
      </div>
    </div>
  );
}
