export const ALLOWED_EMAIL = 'shevchenkodora@gmail.com';

export const AuthErrorEnum = {
  INVALID_CREDENTIAL: 'auth/invalid-credential',
  WRONG_PASSWORD: 'auth/wrong-password',
  USER_NOT_FOUND: 'auth/user-not-found',
  CLOSED_POPUP: 'auth/popup-closed-by-user',
  BLOCKED_POPUP: 'auth/popup-blocked',
  MANY_REQUESTS: 'auth/too-many-requests',
};

export const FirestoreErrorEnum = {
  PERMISSION_DENIED: 'permission-denied',
  UNAVAILABLE: 'unavailable',
  NOT_FOUND: 'not-found',
};
