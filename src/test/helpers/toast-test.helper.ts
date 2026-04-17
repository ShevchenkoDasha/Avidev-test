import { findByTestId, screen } from '@testing-library/react';
import { type UserEvent, userEvent } from '@testing-library/user-event';

export interface ToastLookupModel {
  toast: HTMLElement;
  getContent: () => string;
  close: () => Promise<void>;
}
export const getToastLookup = async (
  name: string,
): Promise<ToastLookupModel> => {
  const toast = await screen.findByRole('alert', { name });

  return {
    toast,
    getContent: () => toast.textContent?.trim() ?? '',
    close: () => closeToast(toast),
  };
};

const closeToast = async (toast: HTMLElement): Promise<void> => {
  const user = setupUser();
  const closeButton = await findByTestId(toast, 'CloseOutlinedIcon');
  await user.click(closeButton);
};

const setupUser = (): UserEvent => {
  return userEvent.setup({ delay: null });
};
