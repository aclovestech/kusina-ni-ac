// Imports
import { NavbarStart } from './NavbarStart';
import { NavbarCenter } from './NavbarCenter';
import { NavbarEnd } from './NavbarEnd';

// Interface
export interface NavMenuItemType {
  label: string;
  link: string;
  children?: { label: string; link: string }[];
}

// Nav Menu Data
const navMenuData: NavMenuItemType[] = [
  { label: 'Home', link: '/' },
  {
    label: 'Menu',
    link: '/menu',
  },
  { label: 'About', link: '/about' },
];

// Header component
export const Header: React.FC = () => {
  return (
    <header className="navbar bg-base-300">
      <NavbarStart navMenuData={navMenuData} />
      <NavbarCenter navMenuData={navMenuData} />
      <NavbarEnd />
    </header>
  );
};
