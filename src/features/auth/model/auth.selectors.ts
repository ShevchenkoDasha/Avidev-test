import type { RootState } from '@/app/store/rootReducer';

export const authAdminSelector = (state: RootState) => state.auth.admin;
export const authLoadingSelector = (state: RootState) => state.auth.loading;
export const authErrorSelector = (state: RootState) => state.auth.error;
export const isAuthenticatedSelector = (state: RootState) =>
  Boolean(state.auth.isAuthenticated);
