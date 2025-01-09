// Imports
import { User } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import closeDropdown from '../../utils/closeDropdown';
import {
  useCheckCustomerSession,
  useLogoutCustomer,
} from '../../hooks/useAuthHooks';
import { useNavigate } from '@tanstack/react-router';

export default function NavbarUser() {
  const { data: user } = useCheckCustomerSession();
  const navigate = useNavigate();

  function UserNotSignedIn() {
    return (
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-50 mt-3 w-44 bg-base-200 shadow"
      >
        <div className="card-body items-center text-center">
          <span className="card-title">You are not signed in</span>
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
      </div>
    );
  }

  function UserSignedIn() {
    const { mutate: logout } = useLogoutCustomer(() => {
      navigate({ to: '/' });
    });

    const handleLogout = () => {
      logout();
    };

    return (
      <div>
        <ul
          tabIndex={0}
          className="menu dropdown-content menu-sm z-50 mt-3 w-44 items-center rounded-box bg-base-200 p-2 shadow"
        >
          <p className="py-1">Hello, {user?.first_name}</p>
          <div className="divider my-0"></div>
          <div className="menu menu-sm gap-2 pt-1 text-center">
            <Link to="/personal-details">Personal Details</Link>
            <Link to="/addresses">Addresses</Link>
            <Link to="/orders">Orders</Link>
            <div className="my-2" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </ul>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end dropdown-bottom">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
        <User />
      </div>
      {user ? <UserSignedIn /> : <UserNotSignedIn />}
    </div>
  );
}
