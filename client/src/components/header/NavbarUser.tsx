// Imports
import { User } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import closeDropdown from '../../utils/closeDropdown';

export default function NavbarUser() {
  const isAuthenticated = true;

  return (
    <div className="dropdown dropdown-end dropdown-bottom">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
        <User />
      </div>
      {isAuthenticated ? <UserSignedIn /> : <UserNotSignedIn />}
    </div>
  );
}

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
  const user = {
    first_name: 'John',
  };
  const logout = () => {};

  return (
    <div>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-50 mt-3 w-44 items-center rounded-box bg-base-200 p-2 shadow"
      >
        <p className="py-1">Hello, {user?.first_name}</p>
        <div className="divider my-0"></div>
        <div className="menu menu-sm gap-2 pt-1 text-center">
          <Link to="/profile">Profile</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/settings">Account Settings</Link>
          <div onClick={logout}>Logout</div>
        </div>
      </ul>
    </div>
  );
}
