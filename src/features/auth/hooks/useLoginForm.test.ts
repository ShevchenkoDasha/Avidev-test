import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, waitFor } from '@testing-library/react';
import { useLoginForm } from './useLoginForm';
import {
  renderHookWithStore,
  createMockStore,
} from '@/test/test-utils.tsx.tsx';

const mockNavigate = vi.fn();
const mockShowError = vi.fn();
const mockShowSuccess = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/features/notification/hooks/useNotification', () => ({
  useNotification: () => ({
    showError: mockShowError,
    showSuccess: mockShowSuccess,
  }),
}));

describe('useLoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty values', () => {
    const mockStore = createMockStore();
    renderHookWithStore(() => {
      const { form } = useLoginForm();
      expect(form.values).toEqual({
        email: '',
        password: '',
      });
      return null;
    }, mockStore);
  });

  it('should have correct initial state', () => {
    const mockStore = createMockStore();
    renderHookWithStore(() => {
      const { form } = useLoginForm();
      expect(form.isSubmitting).toBe(false);
      expect(form.dirty).toBe(false);
      return null;
    }, mockStore);
  });

  it('should validate email field', async () => {
    const mockStore = createMockStore();

    const { result } = renderHookWithStore(() => useLoginForm(), mockStore);

    await act(async () => {
      await result.current.form.setFieldValue('email', 'invalid-email');
      await result.current.form.setFieldTouched('email', true);
      await result.current.form.validateForm();
    });

    await waitFor(() => {
      expect(result.current.form.errors.email).toBeDefined();
    });
  });

  it('should validate password field for minimum length', async () => {
    const mockStore = createMockStore();

    const { result } = renderHookWithStore(() => useLoginForm(), mockStore);

    await act(async () => {
      await result.current.form.setFieldValue('password', '12345');
      await result.current.form.setFieldTouched('password', true);
      await result.current.form.validateForm();
    });

    await waitFor(() => {
      expect(result.current.form.errors.password).toBeDefined();
    });
  });

  it('should accept valid email and password', async () => {
    const mockStore = createMockStore();

    const { result } = renderHookWithStore(() => useLoginForm(), mockStore);
    await act(async () => {
      await result.current.form.setFieldValue('email', 'test@example.com');
      await result.current.form.setFieldValue('password', 'Password123');
      await result.current.form.setFieldTouched('email', true);
      await result.current.form.setFieldTouched('password', true);

      await result.current.form.validateForm();
    });

    await waitFor(() => {
      expect(result.current.form.values.email).toBe('test@example.com');
    });
  });
});
