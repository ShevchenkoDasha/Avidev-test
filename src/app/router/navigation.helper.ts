import { ROUTES } from '@/shared/constants/routes';

export const getRootLink = (): string => '/';

export const getProjectDetailsLink = (id: string): string =>
  `${ROUTES.PROJECTS}/${id}`;
