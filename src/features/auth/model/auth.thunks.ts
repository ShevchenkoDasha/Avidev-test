import { createAsyncThunk } from '@reduxjs/toolkit';

import type { AppError } from '@/shared/lib/errors/app-error.types';
import {
  loginAdminWithEmail,
  loginAdminWithGoogle,
  logoutAdmin,
} from '@/entities/auth/api/auth.service';
import type { AdminUser } from './auth.slice.types';

export const loginWithEmail = createAsyncThunk<
  AdminUser,
  { email: string; password: string },
  { rejectValue: AppError }
>('auth/loginWithEmail', async ({ email, password }, { rejectWithValue }) => {
  try {
    return await loginAdminWithEmail(email, password);
  } catch (error) {
    return rejectWithValue(error as AppError);
  }
});

export const loginWithGoogle = createAsyncThunk<
  AdminUser,
  void,
  { rejectValue: AppError }
>('auth/loginWithGoogle', async (_, { rejectWithValue }) => {
  try {
    return await loginAdminWithGoogle();
  } catch (error) {
    return rejectWithValue(error as AppError);
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: AppError }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutAdmin();
    } catch (error) {
      return rejectWithValue(error as AppError);
    }
  },
);
