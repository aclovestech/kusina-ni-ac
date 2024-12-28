// Imports
import NavbarCart from './NavbarCart';
import NavbarUser from './NavbarUser';

export const NavbarEnd = () => {
  return (
    <div className="navbar-end">
      <NavbarCart />
      <NavbarUser />
    </div>
  );
};
