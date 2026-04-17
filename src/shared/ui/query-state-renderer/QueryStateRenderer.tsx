import { type ReactNode } from 'react';
import { CircularLoader } from '@/shared/ui/circular-loader';

type QueryStateRendererProps<T> = {
  data?: T[];
  isLoading: Boolean;
  isError: Boolean;
  error?: Error | null;
  renderItem: (item: T) => ReactNode;
  emptyFallback?: ReactNode;
  loader?: ReactNode;
  errorFallback?: (message: string) => ReactNode;
};

export const QueryStateRenderer = <T,>({
  data,
  isLoading,
  isError,
  error,
  renderItem,
  emptyFallback = null,
  loader = <CircularLoader />,
  errorFallback,
}: QueryStateRendererProps<T>) => {
  if (isLoading) {
    return loader;
  }

  if (isError) {
    const message = error?.message ?? 'notification.errors.unknown';

    return errorFallback ? errorFallback(message) : <div>{message}</div>;
  }

  if (!data?.length) {
    return emptyFallback;
  }

  return <>{data.map(renderItem)}</>;
};
