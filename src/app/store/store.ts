import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import type { RecursivePartialModel } from '@/shared/types/recursive-partial.types.ts';
import { deepObjectMerge } from '@/shared/helpers/object.helper.ts';
import {
  notificationInitialState,
  notificationSliceName,
} from '@/features/notification/model/notification.slice.ts';
import {
  localeInitialState,
  localeSliceName,
} from '@/features/locale/model/locale.slice.ts';
import {
  authInitialState,
  authSliceName,
} from '@/features/auth/model/auth.slice.ts';
import { rootReducer } from './rootReducer.ts';

const createStore = (initialState?: RecursivePartialModel<RootStateModel>) => {
  const preloadedState = initialState
    ? deepObjectMerge<RootStateModel>(
        {
          [authSliceName]: authInitialState,
          [notificationSliceName]: notificationInitialState,
          [localeSliceName]: localeInitialState,
        },
        initialState,
      )
    : undefined;

  return configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.MODE !== 'production',
    preloadedState,
  });
};

type RootStateModel = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof createStore>;
type AppDispatch = AppStore['dispatch'];

const store = createStore();
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootStateModel> = useSelector;

export { createStore, store, useAppDispatch, useAppSelector };

export type { AppDispatch, RootStateModel };
