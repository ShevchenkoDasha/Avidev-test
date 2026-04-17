import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { NotificationDataModel } from '@/features/notification/model/notification.slice.types';
import NotificationProvider from './NotificationProvider';
import { createMockStore, renderWithProviders } from '@/test/test-utils.tsx';
import { ToastTypeEnum } from '@/shared/ui/toast';

describe('NotificationProvider', () => {
  const renderComponent = (
    notificationData: NotificationDataModel | null = null,
  ) => {
    const store = createMockStore({
      notification: {
        data: notificationData,
      },
    });

    return renderWithProviders(<NotificationProvider />, {
      store,
      withRouter: false,
    });
  };

  it('does not render notification when data is null', () => {
    renderComponent();

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders notification when data exists', async () => {
    const notificationAriaLabel = 'Test Notification Label';
    const notificationText = 'Test Notification';

    renderComponent({
      type: ToastTypeEnum.WARNING,
      text: notificationText,
      ariaLabel: notificationAriaLabel,
    });

    expect(
      await screen.findByLabelText(notificationAriaLabel),
    ).toBeInTheDocument();
    expect(await screen.findByText(notificationText)).toBeInTheDocument();
  });
});
