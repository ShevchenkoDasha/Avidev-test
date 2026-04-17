import { Navigate, Outlet } from 'react-router-dom';

import { CircularLoader } from '@/shared/ui/circular-loader';
import { useAppSelector } from '@/app/store/hooks';
import {
  authLoadingSelector,
  isAuthenticatedSelector,
} from './model/auth.selectors';

const RequireAdminAuth = () => {
  const loading = useAppSelector(authLoadingSelector);
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);

  if (loading) {
    return <CircularLoader />;
  }

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
};

export default RequireAdminAuth;
