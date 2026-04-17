export const ToastTypeEnum = {
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export type ToastType = (typeof ToastTypeEnum)[keyof typeof ToastTypeEnum];
