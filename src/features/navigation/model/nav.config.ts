import { ROUTES } from '@/shared/constants/routes';
import type { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'nav.projects', href: ROUTES.PROJECTS },
  { label: 'nav.career', href: ROUTES.CAREER },
  { label: 'nav.contact', href: ROUTES.CONTACT },
];
