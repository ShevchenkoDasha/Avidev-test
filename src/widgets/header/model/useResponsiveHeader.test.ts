import { renderHook } from '@testing-library/react';
import { useResponsiveHeader } from './useResponsiveHeader';
import { useResponsive } from '@/shared/hooks';

vi.mock('@/shared/hooks', () => ({
  useResponsive: vi.fn(),
}));

describe('useResponsiveHeader', () => {
  it('should show full nav on tablet and up', () => {
    (useResponsive as any).mockReturnValue({ isTabletUp: true });

    const { result } = renderHook(() => useResponsiveHeader());

    expect(result.current.showFullNav).toBe(true);
    expect(result.current.showMobileMenu).toBe(false);
  });

  it('should show mobile menu on small screens', () => {
    (useResponsive as any).mockReturnValue({ isTabletUp: false });

    const { result } = renderHook(() => useResponsiveHeader());

    expect(result.current.showFullNav).toBe(false);
    expect(result.current.showMobileMenu).toBe(true);
  });
});
