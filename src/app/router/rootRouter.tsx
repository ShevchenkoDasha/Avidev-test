import { lazy } from 'react';

import { ROUTES } from '@/shared/constants/routes';
import RouterErrorFallback from '../layouts/router-error-fallback/RouterErrorFallback';

const MainLayoutLazy = lazy(() => import('../layouts/main-layout/MainLayout'));
const AdminLayoutLazy = lazy(
  () => import('../layouts/admin-layout/AdminLayout'),
);
const MainPageLazy = lazy(() => import('@/pages/main/MainPage'));
const ProjectsPageLazy = lazy(() => import('@/pages/projects/ProjectsPage'));
const ProjectDetailsPageLazy = lazy(
  () => import('@/pages/projects/ProjectDetailsPage'),
);
const CareerPageLazy = lazy(() => import('@/pages/career/CareerPage'));
const ContactPageLazy = lazy(() => import('@/pages/contact/ContactPage'));
const AdminPageLazy = lazy(() => import('@/pages/admin/AdminPage'));
const AdminLoginPageLazy = lazy(
  () => import('@/pages/admin-login/AdminLoginPage'),
);
const RequireAdminAuthLazy = lazy(
  () => import('@/features/auth/RequireAdminAuth'),
);
const PrivacyPageLazy = lazy(() => import('@/pages/privacy/PrivacyPage'));
const TermsPageLazy = lazy(() => import('@/pages/terms/TermsPage'));

export const rootRouterConfiguration = [
  {
    path: ROUTES.MAIN,
    element: <MainLayoutLazy />,
    errorElement: <RouterErrorFallback />,
    children: [
      { index: true, element: <MainPageLazy /> },
      { path: ROUTES.CAREER, element: <CareerPageLazy /> },
      { path: ROUTES.CONTACT, element: <ContactPageLazy /> },
      { path: ROUTES.PRIVACY, element: <PrivacyPageLazy /> },
      { path: ROUTES.TERM, element: <TermsPageLazy /> },
      {
        path: ROUTES.PROJECTS,
        children: [
          { path: '', element: <ProjectsPageLazy /> },
          { path: ':id', element: <ProjectDetailsPageLazy /> },
        ],
      },
    ],
  },
  {
    path: ROUTES.ADMIN,
    element: <AdminLayoutLazy />,
    children: [
      { path: 'login', element: <AdminLoginPageLazy /> },
      {
        path: '',
        element: <RequireAdminAuthLazy />,
        children: [{ index: true, element: <AdminPageLazy /> }],
      },
    ],
  },
];
