// Imports
import { ShoppingCart } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import closeDropdown from '../../utils/closeDropdown';

const NavbarCart: React.FC = () => {
  return (
    <div className="dropdown dropdown-end dropdown-bottom">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
        <ShoppingCart />
      </div>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-50 mt-3 w-44 bg-base-200 shadow"
      >
        <div className="card-body items-center text-center">
          <span className="card-title">8 Items</span>
          <span className="mb-2 text-primary">Subtotal: $999</span>
          <div className="card-actions">
            <Link
              to="/cart"
              className="btn btn-outline"
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
