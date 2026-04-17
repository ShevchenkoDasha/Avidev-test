import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import type { AppError } from '@/shared/lib/errors/app-error.types';
import { loginWithGoogle } from '@/features/auth/model/auth.thunks';
import { authLoadingSelector } from '@/features/auth/model/auth.selectors';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { ROUTES } from '@/shared/constants/routes';
import { useTranslation } from '@/shared/hooks';
import { useNotification } from '@/features/notification/hooks/useNotification';

interface UseGoogleLoginData {
  loadingGoogleLogin: boolean;
  handleLoginWithGoogle: () => void;
}

export const useGoogleLogin = (): UseGoogleLoginData => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { translate } = useTranslation();
  const loadingGoogleLogin = useAppSelector(authLoadingSelector);
  const { showError, showSuccess } = useNotification();

  const handleLoginWithGoogle = useCallback(async () => {
    try {
      await dispatch(loginWithGoogle()).unwrap();

      showSuccess(translate('notification.successfulGoogleLogin'));
      navigate(ROUTES.ADMIN);
    } catch (error) {
      const appError = error as AppError;
      showError(translate(appError.message));
    }
  }, [dispatch, translate, navigate, showSuccess, showError]);

  return useMemo(
    () => ({
      loadingGoogleLogin,
      handleLoginWithGoogle,
    }),
    [loadingGoogleLogin, handleLoginWithGoogle],
  );
};
