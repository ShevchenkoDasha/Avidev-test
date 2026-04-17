import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';
import { memo } from 'react';
import type { ReactNode } from 'react';

interface PropsModel {
  children: ReactNode;
}

const queryClient = new QueryClient();

const QueryClientProvider = memo((props: PropsModel) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {props.children}
    </ReactQueryClientProvider>
  );
});

QueryClientProvider.displayName = 'QueryClientProvider';

export default QueryClientProvider;
