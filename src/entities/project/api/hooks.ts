import { useNotification } from '@/features/notification/hooks/useNotification';
import {
  getProjectList,
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
} from '@/shared/api/project.api';
import type { Project, ProjectData } from '@/shared/api/types/project.types';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import { useMutation, useQueryClient } from '@/shared/hooks/use-mutation';
import { useQuery } from '@/shared/hooks/use-query';

export const useProjects = () => {
  return useQuery<Project[]>({
    key: [QUERY_KEYS.PROJECT],
    resolver: getProjectList,
  });
};

export const useProject = (id?: string) => {
  const queryClient = useQueryClient();

  return useQuery<Project>({
    key: [QUERY_KEYS.PROJECT, id],
    resolver: () => getProjectById(id as string),
    isEnabled: !!id,
    initialData: () => {
      const projects = queryClient.getQueryData<Project[]>(['projects']);
      return projects?.find((project) => project.id === id);
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useNotification();

  return useMutation({
    resolver: (data: ProjectData) => createProject(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEYS.PROJECT]);
      showSuccess('projects.successfulSaving');
    },
    onError: (error: any) => {
      showError(error.message ?? 'projects.unsuccessfulSaving');
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    resolver: ({ id, data }: { id: string; data: Partial<ProjectData> }) =>
      updateProject(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEYS.PROJECT]);
      showSuccess('projects.successfulUpdating');
    },
    onError: (error: any) => {
      showError(error.message ?? 'projects.unsuccessfulUpdating');
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    resolver: (id: string) => deleteProject(id),
    onSuccess: async () => {
      queryClient.invalidateQueries([QUERY_KEYS.PROJECT]);
      showSuccess('projects.successfulDeleting');
    },
    onError: (error: any) => {
      showError(error.message ?? 'projects.unsuccessfulDeleting');
    },
  });
};
