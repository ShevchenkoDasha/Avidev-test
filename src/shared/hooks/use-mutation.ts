import { useCallback, useMemo } from 'react';
import {
  type QueryKey,
  useMutation as useReactMutation,
  useQueryClient as useReactQueryClient,
} from '@tanstack/react-query';

export interface UseQueryClientModel {
  invalidateQueries: (queryKey: QueryKey) => Promise<void>;
  getQueryData: <T>(queryKey: QueryKey) => T | undefined;
}

type UseMutationConfig<TData, TVariables> = {
  resolver: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
};

export const useMutation = <TData, TVariables>(
  config: UseMutationConfig<TData, TVariables>,
) => {
  const mutation = useReactMutation({
    mutationFn: config.resolver,
    onSuccess: config.onSuccess,
  });

  return useMemo(
    () => ({
      mutate: mutation.mutate,
      isLoading: mutation.isPending,
      error: mutation.error,
    }),
    [mutation],
  );
};

export const useQueryClient = (): UseQueryClientModel => {
  const queryClient = useReactQueryClient();

  const invalidateQueries = useCallback(
    async (queryKey: QueryKey) => {
      await queryClient.invalidateQueries({ queryKey });
    },
    [queryClient],
  );

  const getQueryData = useCallback(
    <T>(queryKey: QueryKey): T | undefined => {
      return queryClient.getQueryData<T>(queryKey);
    },
    [queryClient],
  );

  return useMemo(
    () => ({ invalidateQueries, getQueryData }),
    [invalidateQueries, getQueryData],
  );
};
