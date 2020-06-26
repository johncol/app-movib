import { Path } from './paths';

export interface MenuOption {
  label: string;
  link: string;
}

export const options: MenuOption[] = [
  {
    label: 'To watch',
    link: Path.LIST_TO_WATCH,
  },
  {
    label: 'Watched',
    link: Path.LIST_WATCHED,
  },
  {
    label: 'Search',
    link: Path.SEARCH,
  },
  {
    label: 'Logout',
    link: Path.LOGOUT,
  },
];
