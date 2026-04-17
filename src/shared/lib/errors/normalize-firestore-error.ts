import { FirestoreErrorEnum } from '@/shared/constants/auth';
import { unknownCodeError } from '@/shared/constants/notifications';
import type { AppError } from './app-error.types';

export const normalizeFirestoreError = (error: any): AppError => {
  const code = error?.code ?? unknownCodeError;
  switch (code) {
    case FirestoreErrorEnum.PERMISSION_DENIED:
      return {
        code,
        message: 'notification.errors.noActionPermission',
      };
    case FirestoreErrorEnum.UNAVAILABLE:
      return {
        code,
        message: 'notification.errors.serviceNotAvailable',
      };
    case FirestoreErrorEnum.NOT_FOUND:
      return {
        code,
        message: 'notification.errors.notFound',
      };
    default:
      return {
        code,
        message: error?.message ?? 'notification.errors.unknown',
      };
  }
};
