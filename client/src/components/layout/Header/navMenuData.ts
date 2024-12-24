import { NavMenuItemProps } from './header.interfaces';

export function createNavMenuData(): NavMenuItemProps['item'][] {
  // TODO: Get the categories from the database
  return [
    { label: 'Home', link: '/' },
    {
      label: 'Categories',
      link: '/',
      children: [
        { label: 'Submenu 1', link: '/' },
        { label: 'Submenu 2', link: '/' },
      ],
    },
    { label: 'About', link: '/' },
  ];
}
