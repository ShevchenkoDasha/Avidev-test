import { FirebaseError } from 'firebase/app';

import type { AppError } from './app-error.types';
import { unknownCodeError } from '@/shared/constants/notifications';
import { AuthErrorEnum } from '@/shared/constants/auth';

export const normalizeAuthFirebaseError = (error: unknown): AppError => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case AuthErrorEnum.INVALID_CREDENTIAL:
      case AuthErrorEnum.WRONG_PASSWORD:
      case AuthErrorEnum.USER_NOT_FOUND:
        return {
          code: error.code,
          message: 'notification.errors.invalidCredentials',
        };

      case AuthErrorEnum.CLOSED_POPUP:
        return {
          code: error.code,
          message: 'notification.errors.googlePopupClosed',
        };

      case AuthErrorEnum.BLOCKED_POPUP:
        return {
          code: error.code,
          message: 'notification.errors.googlePopupBlocked',
        };

      case AuthErrorEnum.MANY_REQUESTS:
        return {
          code: error.code,
          message: 'notification.errors.tooManyRequests',
        };

      default:
        return {
          code: error.code,
          message: 'notification.errors.generic',
        };
    }
  }

  if (error instanceof Error) {
    return {
      code: unknownCodeError,
      message: error.message,
    };
  }

  return {
    code: unknownCodeError,
    message: 'notification.errors.unknown',
  };
};
