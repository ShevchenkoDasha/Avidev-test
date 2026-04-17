import { type PropsWithChildren, useEffect } from 'react';
import { subscribeToAuthChanges } from '@/shared/api/firebase/auth';
import { useAppDispatch } from '../store/hooks';
import { authSlice } from '@/features/auth/model/auth.slice';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(
      (user) => {
        dispatch(authSlice.actions.setAdminUser(user));
      },
      () => {
        dispatch(authSlice.actions.clearAdminUser());
      },
    );

    return unsubscribe;
  }, [dispatch]);

  return children;
};
