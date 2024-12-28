// Imports
import NavbarStart from './NavbarStart';
import NavbarCenter from './NavbarCenter';
import NavbarEnd from './NavbarEnd';

// Interface
export interface INavMenuItem {
  label: string;
  link: string;
  children?: { label: string; link: string }[];
}

// Nav Menu Data
const navMenuData: INavMenuItem[] = [
  { label: 'Home', link: '/' },
  {
    label: 'Categories',
    link: '/categories',
  },
  { label: 'About', link: '/about' },
];

// Header component
export default function Header() {
  return (
    <header className="navbar bg-base-300">
      <NavbarStart navMenuData={navMenuData} />
      <NavbarCenter navMenuData={navMenuData} />
      <NavbarEnd />
    </header>
  );
}
