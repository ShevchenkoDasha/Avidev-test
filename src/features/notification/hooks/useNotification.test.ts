import { describe, it, expect, vi } from 'vitest';
import { act } from '@testing-library/react';
import { useNotification } from './useNotification';
import {
  renderHookWithStore,
  createMockStore,
} from '@/test/test-utils.tsx.tsx';

describe('useNotification', () => {
  it('should return notification functions', () => {
    const mockStore = createMockStore();
    const { result } = renderHookWithStore(() => useNotification(), mockStore);

    expect(result.current).toBeDefined();
  });

  it('should dispatch success notification', () => {
    const mockStore = createMockStore();
    renderHookWithStore(() => {
      const { showSuccess } = useNotification();
      showSuccess('Success message');
      return null;
    }, mockStore);

    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should dispatch error notification', () => {
    const mockStore = createMockStore();
    renderHookWithStore(() => {
      const { showError } = useNotification();
      showError('Error message');
      return null;
    }, mockStore);

    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should dispatch info notification', () => {
    const mockStore = createMockStore();
    renderHookWithStore(() => {
      const { showInfo } = useNotification();
      showInfo('Info message');
      return null;
    }, mockStore);

    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should clear notification', () => {
    const mockStore = createMockStore();
    renderHookWithStore(() => {
      const { clear } = useNotification();
      clear();
      return null;
    }, mockStore);

    expect(mockStore.dispatch).toHaveBeenCalled();
  });
});
