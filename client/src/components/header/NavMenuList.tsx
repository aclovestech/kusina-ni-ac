// Imports
import { Link } from '@tanstack/react-router';
import closeDropdown from '../../utils/closeDropdown';

type NavMenuItem = {
  label: string;
  link: string;
};

const navMenuData: NavMenuItem[] = [
  { label: 'Home', link: '/' },
  {
    label: 'Menu',
    link: '/menu',
  },
  { label: 'About', link: '/about' },
];

export function NavMenuList() {
  return navMenuData.map((item) => {
    return (
      <li key={item.label}>
        <Link to={item.link} onClick={closeDropdown}>
          {item.label}
        </Link>
      </li>
    );
  });
}
