import { useAppDispatch } from '@/app/store/hooks';
import { notificationSlice } from '../model/notification.slice';
import { ToastTypeEnum } from '@/shared/ui/toast';
import { useCallback, useMemo } from 'react';

export const useNotification = () => {
  const dispatch = useAppDispatch();

  const showError = useCallback(
    (text: string) => {
      dispatch(
        notificationSlice.actions.setNotification({
          type: ToastTypeEnum.WARNING,
          text,
          ariaLabel: 'error notification',
        }),
      );
    },
    [dispatch],
  );

  const showSuccess = useCallback(
    (text: string) => {
      dispatch(
        notificationSlice.actions.setNotification({
          type: ToastTypeEnum.SUCCESS,
          text,
          ariaLabel: 'success notification',
        }),
      );
    },
    [dispatch],
  );

  const showInfo = useCallback(
    (text: string) => {
      dispatch(
        notificationSlice.actions.setNotification({
          type: ToastTypeEnum.INFO,
          text,
          ariaLabel: 'info notification',
        }),
      );
    },
    [dispatch],
  );

  const clear = useCallback(() => {
    dispatch(notificationSlice.actions.setNotification(null));
  }, [dispatch]);

  return useMemo(
    () => ({
      showError,
      showSuccess,
      showInfo,
      clear,
    }),
    [showError, showSuccess, showInfo, clear],
  );
};
