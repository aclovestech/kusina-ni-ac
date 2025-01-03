// Imports
import { ShoppingCart } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import closeDropdown from '../../utils/closeDropdown';
import { useGetCart } from '../../hooks/useCartHooks';

export default function NavbarCart() {
  const { data: cart } = useGetCart();

  function UserNotSignedIn() {
    return (
      <div className="card-body items-center text-center">
        <span className="card-title">
          You need to be signed in to use the cart.
        </span>
        <div className="card-actions">
          <Link
            to="/auth/sign-in"
            className="btn btn-outline"
            onClick={closeDropdown}
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  function UserSignedIn() {
    const total = cart?.cart_items
      .map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b, 0);

    return (
      <div className="card-body items-center text-center">
        <span className="card-title">{`Items: ${cart?.cart_items.length}`}</span>
        <span className="mb-2 text-primary">{`Total: $${total}`}</span>
        <div className="card-actions">
          <Link to="/cart" className="btn btn-outline" onClick={closeDropdown}>
            View cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end dropdown-bottom">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
        <ShoppingCart />
      </div>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-50 mt-3 w-44 bg-base-200 shadow"
      >
        {cart ? <UserSignedIn /> : <UserNotSignedIn />}
      </div>
    </div>
  );
}
