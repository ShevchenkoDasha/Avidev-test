import { combineReducers } from '@reduxjs/toolkit';

import {
  localeSlice,
  localeSliceName,
} from '@/features/locale/model/locale.slice';
import {
  notificationSlice,
  notificationSliceName,
} from '@/features/notification/model/notification.slice';
import { authSlice, authSliceName } from '@/features/auth/model/auth.slice';

export const rootReducer = combineReducers({
  [authSliceName]: authSlice.reducer,
  [notificationSliceName]: notificationSlice.reducer,
  [localeSliceName]: localeSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
