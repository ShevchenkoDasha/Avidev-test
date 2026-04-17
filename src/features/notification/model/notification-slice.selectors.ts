import { createSelector } from '@reduxjs/toolkit';

import type { RootStateModel } from '@/app/store/store.ts';
import type { NotificationSliceValueModel } from './notification.slice.types';

const notificationSliceSelector = (
  state: RootStateModel,
): NotificationSliceValueModel => state.notification;

export const notificationDataSelector = createSelector(
  [notificationSliceSelector],
  (state: NotificationSliceValueModel) => state.data,
);
