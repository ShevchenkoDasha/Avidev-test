import { useResponsive } from '@/shared/hooks';
import { useMemo } from 'react';

export interface UseResponsiveHeaderType {
  showFullNav: boolean;
  showMobileMenu: boolean;
}

export const useResponsiveHeader = (): UseResponsiveHeaderType => {
  const { isTabletUp } = useResponsive();

  return useMemo(
    () => ({
      showFullNav: isTabletUp, // desktop nav visible on tablet and up
      showMobileMenu: !isTabletUp, // mobile menu visible below tablet
    }),
    [isTabletUp],
  );
};
