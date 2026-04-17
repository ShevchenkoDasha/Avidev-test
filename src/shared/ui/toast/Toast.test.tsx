import { render, type RenderResult, act } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import Toast, { ToastTypeEnum } from './index.ts';
import type { ToastPropsModel } from './Toast.tsx';
import { getToastLookup } from '@/test/helpers/toast-test.helper.ts';

describe('Toast', () => {
  const ariaLabel = 'Test Toast';

  const renderComponent = (props?: Partial<ToastPropsModel>): RenderResult => {
    return render(
      <Toast
        ariaLabel={ariaLabel}
        handleClose={props?.handleClose ?? vi.fn()}
        type={props?.type ?? ToastTypeEnum.WARNING}
      >
        Content
      </Toast>,
    );
  };

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should show toast', async () => {
    renderComponent();
    const toastLookup = await getToastLookup(ariaLabel);

    expect(toastLookup.getContent()).toEqual('Content');
  });

  it('should call close handler on close button click', async () => {
    const closeHandler = vi.fn();
    renderComponent({ handleClose: closeHandler });
    const toastLookup = await getToastLookup(ariaLabel);

    await toastLookup.close();

    expect(closeHandler).toHaveBeenCalledTimes(1);
  });

  it('should automatically call close handler after timeout', () => {
    vi.useFakeTimers();

    const closeHandler = vi.fn();
    renderComponent({ handleClose: closeHandler });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(closeHandler).toHaveBeenCalledTimes(0);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(closeHandler).toHaveBeenCalledTimes(1);
  });
});
