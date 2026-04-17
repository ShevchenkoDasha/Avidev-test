import { useCallback, useMemo } from 'react';

import type { AppError } from '@/shared/lib/errors/app-error.types';
import { useAppDispatch } from '@/app/store/hooks';
import { forgotPassword } from '@/entities/auth/api/auth.service';
import { useTranslation } from '@/shared/hooks';
import { useNotification } from '@/features/notification/hooks/useNotification';

interface UseForgotPasswordData {
  handleForgotPassword: (email: string) => void;
}

export const useForgotPassword = (): UseForgotPasswordData => {
  const dispatch = useAppDispatch();
  const { translate } = useTranslation();
  const { showError, showSuccess } = useNotification();

  const handleForgotPassword = useCallback(
    async (email: string) => {
      try {
        await forgotPassword(email);

        showSuccess(translate('notification.success.passwordResetSent'));
      } catch (error) {
        const appError = error as AppError;

        showError(translate(appError.message));
      }
    },
    [dispatch, translate],
  );

  return useMemo(
    () => ({
      handleForgotPassword,
    }),
    [handleForgotPassword],
  );
};
