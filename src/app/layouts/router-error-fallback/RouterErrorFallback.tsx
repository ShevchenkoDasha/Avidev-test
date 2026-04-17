import { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

import {
  isDynamicModuleLoadingError,
  isErrorResponseTypeError,
} from './RouterErrorFallback.helper.ts';
import { getRootLink } from '@/app/router/navigation.helper.ts';

const RouterErrorFallback = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDynamicModuleLoadingError(error)) {
      alert(
        'The application is outdated. The page is reloading automatically.',
      );
      window.location.reload();
    } else if (isErrorResponseTypeError(error) && error.status === 404) {
      navigate(getRootLink());
    }
  }, [error, navigate]);

  return <p>Something went wrong</p>;
};

RouterErrorFallback.displayName = 'RouterErrorFallback';

export default RouterErrorFallback;
