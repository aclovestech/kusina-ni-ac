// Imports
import NavbarCart from './NavbarCart';
import NavbarUser from './NavbarUser';

const NavbarEnd = () => {
  return (
    <div className="navbar-end">
      <NavbarCart />
      <NavbarUser />
    </div>
  );
};

export default NavbarEnd;
