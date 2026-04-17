import { useMemo } from 'react';
import {
  type DefaultError,
  useQuery as useReactUseQuery,
} from '@tanstack/react-query';

export interface UseQueryConfigurationModel<T> {
  isEnabled?: boolean;
  key: readonly unknown[];
  resolver: () => Promise<T>;
  initialData?: () => T | undefined;
}

export interface UseQueryModel<T, Error = DefaultError> {
  data: T | undefined;
  error: Error | null;
  isFetching: boolean;
  isLoading: Boolean;
  isError: Boolean;
}

export const useQuery = <T, Error = DefaultError>(
  configuration: UseQueryConfigurationModel<T>,
): UseQueryModel<T, Error> => {
  const queryResult = useReactUseQuery<T, Error>({
    enabled: configuration.isEnabled,
    queryFn: configuration.resolver,
    queryKey: configuration.key,
    refetchOnWindowFocus: false,
    initialData: configuration.initialData,
    staleTime: 60_000,
    retry: 1,
  });

  return useMemo(
    () => ({
      data: queryResult.data,
      error: queryResult.error,
      isFetching: queryResult.isFetching,
      isLoading: queryResult.isLoading,
      isError: queryResult.isError,
    }),
    [
      queryResult.data,
      queryResult.error,
      queryResult.isFetching,
      queryResult.isLoading,
      queryResult.isError,
    ],
  );
};
