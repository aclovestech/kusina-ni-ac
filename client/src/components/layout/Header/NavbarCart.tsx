// Imports
import { ShoppingCart } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import closeDropdown from '../../../utils/closeDropdown';

const NavbarCart: React.FC = () => {
  return (
    <div className="dropdown dropdown-end dropdown-bottom">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
        <ShoppingCart />
      </div>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-50 mt-3 w-52 bg-base-200 shadow"
      >
        <div className="card-body items-center text-center">
          <span className="text-lg font-bold">8 Items</span>
          <span className="text">Subtotal: $999</span>
          <div className="card-actions">
            <Link
              to="/cart"
              className="btn btn-primary btn-block"
              onClick={closeDropdown}
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarCart;
