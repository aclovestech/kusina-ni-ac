import { NavMenuItem } from './NavMenuItem';
import { createNavMenuData } from './navMenuData';
import { ShoppingCart, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="font-awelier navbar bg-base-300">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {createNavMenuData().map((item, index) => (
              <NavMenuItem key={index} item={item} useDetails={false} />
            ))}
          </ul>
        </div>
        <h1 className="hidden h-12 min-h-12 flex-shrink-0 items-center justify-center pl-4 pr-4 text-center text-xl font-extrabold md:inline-flex">
          Kusina ni AC
        </h1>
      </div>

      {/* Navbar Center (Small) */}
      <div className="navbar-center md:hidden">
        <h1 className="inline-flex h-12 min-h-12 flex-shrink-0 items-center justify-center pl-4 pr-4 text-center text-xl font-extrabold">
          Kusina ni AC
        </h1>
      </div>

      {/* Navbar Center (Medium) */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          {createNavMenuData().map((item, index) => (
            <NavMenuItem key={index} item={item} useDetails={true} />
          ))}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {/* Cart */}
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <ShoppingCart />
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-300 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User */}
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <User />
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-300 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-base font-bold">
                  You are not signed in
                </span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
