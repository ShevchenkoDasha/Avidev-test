import has from 'lodash/fp/has';
import type { ErrorResponse } from 'react-router-dom';

export const isDynamicModuleLoadingError = (error: unknown): boolean => {
  return (
    error instanceof Error &&
    error.message.includes('Failed to fetch dynamically imported module')
  );
};

export const isErrorResponseTypeError = (
  error: unknown,
): error is ErrorResponse => {
  return has('status', error);
};
