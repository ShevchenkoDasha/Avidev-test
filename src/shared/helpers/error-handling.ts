import { normalizeFirestoreError } from '../lib/errors/normalize-firestore-error';

export const withErrorHandling = async <T>(
  fn: () => Promise<T>,
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    throw normalizeFirestoreError(error);
  }
};
