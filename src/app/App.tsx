import { Suspense } from 'react';

import { rootRouterConfiguration } from '@/app/router/rootRouter';
import { CircularLoader } from '@/shared/ui/circular-loader';
import QueryClientProvider from './providers/QueryClientProvider';
import RouterProvider from './providers/RouterProvider';
import StoreProvider from './providers/StoreProvider';
import NotificationProvider from './providers/NotificationProvider';
import ThemeProvider from './providers/ThemeProvider';
import { AuthProvider } from './providers/AuthProvider';

import './styles/index.css';

function App() {
  return (
    <StoreProvider>
      <QueryClientProvider>
        <AuthProvider>
          <ThemeProvider>
            <Suspense fallback={<CircularLoader className={'h-svh'} />}>
              <RouterProvider routerConfiguration={rootRouterConfiguration} />
            </Suspense>
          </ThemeProvider>
          <NotificationProvider />
        </AuthProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default App;
