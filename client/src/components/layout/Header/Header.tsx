import { NavMenuItem } from './NavMenuItem';
import { ShoppingCart, User, AlignLeft } from 'lucide-react';

const navMenuData = [
  { label: 'Home', link: '/' },
  {
    label: 'Categories',
    link: '/categories',
  },
  { label: 'About', link: '/about' },
];

export default function Header() {
  return (
    <header className="navbar bg-base-300">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          {/* Hamburger Icon */}
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <AlignLeft />
          </div>
          {/* Title Logo (Medium) */}
          <h1 className="hidden h-12 min-h-12 flex-shrink-0 items-center justify-center pl-4 pr-4 text-center text-xl font-extrabold md:inline-flex">
            Kusina ni AC
          </h1>
          {/* Dropdown Content */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {navMenuData.map((item, index) => (
              <NavMenuItem key={index} item={item} useDetails={false} />
            ))}
          </ul>
        </div>
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
          {navMenuData.map((item, index) => (
            <NavMenuItem key={index} item={item} useDetails={true} />
          ))}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {/* Cart */}
        <div className="dropdown dropdown-bottom dropdown-end">
          {/* Cart Icon */}
          <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
            <ShoppingCart />
          </div>
          {/* Dropdown Content */}
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-200 z-50 mt-3 w-52 shadow"
          >
            <div className="card-body items-center text-center">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>

        {/* User */}
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
            <User />
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-200 z-50 mt-3 w-52 shadow"
          >
            <div className="card-body items-center text-center">
              <span className="text-base font-bold">You are not signed in</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
