import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  NotificationDataModel,
  NotificationSliceValueModel,
} from './notification.slice.types';

const notificationSliceName = 'notification';
const notificationInitialState: NotificationSliceValueModel = { data: null };

const notificationSlice = createSlice({
  name: notificationSliceName,
  initialState: notificationInitialState,
  reducers: {
    setNotification: (
      state: NotificationSliceValueModel,
      action: PayloadAction<NotificationDataModel | null>,
    ) => {
      state.data = action.payload;
    },
  },
});

export { notificationInitialState, notificationSlice, notificationSliceName };
