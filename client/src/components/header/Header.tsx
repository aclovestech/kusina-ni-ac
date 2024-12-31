// Imports
import NavbarStart from './NavbarStart';
import NavbarCenter from './NavbarCenter';
import NavbarEnd from './NavbarEnd';

export function Header() {
  return (
    <header className="navbar bg-base-300">
      <NavbarStart />
      <NavbarCenter />
      <NavbarEnd />
    </header>
  );
}
