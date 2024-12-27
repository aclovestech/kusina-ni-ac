// Imports
import { Link } from '@tanstack/react-router';

// Interface for the NavMenuItem component
interface NavMenuItemProps {
  item: {
    label: string;
    link: string;
    children?: { label: string; link: string }[];
  };
  useDetails?: boolean;
}

// NavMenuItem component
export function NavMenuItem({ item, useDetails }: NavMenuItemProps) {
  if (!item.children) {
    return (
      <li>
        <Link to={item.link}>{item.label}</Link>
      </li>
    );
  }

  return (
    <li>
      {useDetails ? (
        <details>
          <summary>{item.label}</summary>
          <ul className="p-2">
            {item.children.map((child, index) => (
              <NavMenuItem key={index} item={child} />
            ))}
          </ul>
        </details>
      ) : (
        <>
          <Link to={item.link}>{item.label}</Link>
          <ul className="p-2">
            {item.children.map((child, index) => (
              <NavMenuItem key={index} item={child} />
            ))}
          </ul>
        </>
      )}
    </li>
  );
}
