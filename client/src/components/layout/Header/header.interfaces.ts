export interface NavMenuItemProps {
  item: {
    label: string;
    link: string;
    children?: { label: string; link: string }[];
  };
  useDetails?: boolean;
}
