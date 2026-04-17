import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { app } from './client';

export const auth = getAuth(app);

export const subscribeToAuthChanges = (
  onAuthorized: (user: {
    id: string;
    email: string | null;
    name: string | null;
  }) => void,
  onUnauthorized: () => void,
) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      onAuthorized({
        id: user.uid,
        email: user.email,
        name: user.displayName,
      });
    } else {
      onUnauthorized();
    }
  });
};
