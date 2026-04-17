import { lazy, memo, Suspense, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../store/store.ts';
import { notificationSlice } from '@/features/notification/model/notification.slice.ts';
import { notificationDataSelector } from '@/features/notification/model/notification-slice.selectors.ts';

const ToastLazy = lazy(() => import('@/shared/ui/toast'));

const NotificationProvider = memo(() => {
  const notification = useAppSelector(notificationDataSelector);
  const dispatch = useAppDispatch();
  const handleClose = useCallback(
    () => dispatch(notificationSlice.actions.setNotification(null)),
    [dispatch],
  );

  return notification ? (
    <Suspense>
      <ToastLazy
        ariaLabel={notification.ariaLabel}
        type={notification.type}
        handleClose={handleClose}
      >
        {notification.text}
      </ToastLazy>
    </Suspense>
  ) : null;
});

NotificationProvider.displayName = 'NotificationProvider';

export default NotificationProvider;
