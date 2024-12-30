// Imports
import { NavMenuList } from './NavMenuList';

export default function NavbarCenter() {
  return (
    <>
      <div className="navbar-center md:hidden">
        <h1 className="inline-flex h-12 min-h-12 flex-shrink-0 items-center justify-center pl-4 pr-4 text-center text-xl font-extrabold">
          Kusina ni AC
        </h1>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <NavMenuList />
        </ul>
      </div>
    </>
  );
}
