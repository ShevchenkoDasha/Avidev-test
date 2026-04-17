import {
  getCareers,
  createCareer,
  updateCareer,
  deleteCareer,
} from '@/shared/api/career.api';
import type { Career, CareerData } from '@/shared/api/types/career.types';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useMutation, useQueryClient } from '@/shared/hooks/use-mutation';
import { useQuery } from '@/shared/hooks/use-query';
import { useNotification } from '@/features/notification/hooks/useNotification';

export const useCareer = () => {
  return useQuery<Career[], Error>({
    key: [QUERY_KEYS.CAREER],
    resolver: getCareers,
  });
};

export const useCreateCareer = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useNotification();

  return useMutation({
    resolver: (data: CareerData) => createCareer(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEYS.CAREER]);
      showSuccess('careers.successfulSaving');
    },
    onError: (error: any) => {
      showError(error.message ?? 'careers.unsuccessfulSaving');
    },
  });
};

export const useUpdateCareer = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    resolver: ({ id, data }: { id: string; data: Partial<CareerData> }) =>
      updateCareer(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEYS.CAREER]);
      showSuccess('careers.successfulUpdating');
    },
    onError: (error: any) => {
      showError(error.message ?? 'careers.unsuccessfulUpdating');
    },
  });
};

export const useDeleteCareer = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    resolver: (id: string) => deleteCareer(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEYS.CAREER]);
      showSuccess('careers.successfulDeleting');
    },
    onError: (error: any) => {
      showError(error.message ?? 'careers.unsuccessfulDeleting');
    },
  });
};
