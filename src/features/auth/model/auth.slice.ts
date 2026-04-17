import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AdminUser, AuthSliceValueModel } from './auth.slice.types';
import { loginWithEmail, loginWithGoogle, logout } from './auth.thunks';
import { unknownCodeError } from '@/shared/constants/notifications';

const authSliceName = 'auth';

const authInitialState: AuthSliceValueModel = {
  isAuthenticated: false,
  admin: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: authSliceName,
  initialState: authInitialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
    setAdminUser: (state, action) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    clearAdminUser: (state) => {
      state.admin = null;
      state.loading = false;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginWithEmail.fulfilled,
        (state, action: PayloadAction<AdminUser>) => {
          state.loading = false;
          state.admin = action.payload;
          state.isAuthenticated = true;
        },
      )
      .addCase(loginWithEmail.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload ?? {
          code: unknownCodeError,
          message: 'notification.entryError',
        };
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginWithGoogle.fulfilled,
        (state, action: PayloadAction<AdminUser>) => {
          state.loading = false;
          state.admin = action.payload;
          state.isAuthenticated = true;
        },
      )
      .addCase(
        loginWithGoogle.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload ?? {
            code: unknownCodeError,
            message: 'notification.entryErrorWithGoogle',
          };
        },
      )
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.admin = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? {
          code: unknownCodeError,
          message: 'notification.logoutError',
        };
      });
  },
});

export { authInitialState, authSlice, authSliceName };
