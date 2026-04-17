import type { ToastType } from '@/shared/ui/toast';

export interface NotificationSliceValueModel {
  data: NotificationDataModel | null;
}

export interface NotificationDataModel {
  ariaLabel: string;
  text: string;
  type: ToastType;
}
