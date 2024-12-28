// Imports
import { User } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import closeDropdown from '../../../utils/closeDropdown';

const NavbarUser: React.FC = () => {
  return (
    <div className="dropdown dropdown-end dropdown-bottom">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
        <User />
      </div>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-50 mt-3 w-52 bg-base-200 shadow"
      >
        <div className="card-body items-center text-center">
          <span className="text-base font-bold">You are not signed in</span>
          <div className="card-actions">
            <Link
              to="/auth/sign-in"
              className="btn btn-primary btn-block"
              onClick={closeDropdown}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
