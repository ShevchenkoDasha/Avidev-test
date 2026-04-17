import { memo, useMemo } from 'react';
import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

interface PropsModel {
  routerConfiguration: RouteObject[];
}

const RouterProvider = memo((props: PropsModel) => {
  const routerConfiguration = useMemo(
    () => createBrowserRouter(props.routerConfiguration),
    [props.routerConfiguration],
  );

  return (
    <ReactRouterProvider router={routerConfiguration}></ReactRouterProvider>
  );
});

RouterProvider.displayName = 'RouterProvider';

export default RouterProvider;
