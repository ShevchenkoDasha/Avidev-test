import type { AppError } from '@/shared/lib/errors/app-error.types';

export interface AuthSliceValueModel {
  isAuthenticated: boolean;
  admin: AdminUser | null;
  loading: boolean;
  error: AppError | null;
}

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
}
