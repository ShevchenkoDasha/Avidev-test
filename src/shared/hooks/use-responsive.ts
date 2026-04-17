import { useMemo } from 'react';
import { useMediaQuery } from '@mui/material';
import { mediaQueries } from '../constants/responsive-data';

export interface UseResponsiveType {
  isMobile: boolean;
  isPhablet: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isTabletUp: boolean;
}

export const useResponsive = (): UseResponsiveType => {
  const isPhabletUp = useMediaQuery(mediaQueries.phablet);
  const isTabletUp = useMediaQuery(mediaQueries.tablet);
  const isLaptopUp = useMediaQuery(mediaQueries.laptop);
  const isDesktop = useMediaQuery(mediaQueries.desktop);

  return useMemo(
    () => ({
      isMobile: !isPhabletUp,
      isPhablet: isPhabletUp && !isTabletUp,
      isTablet: isTabletUp && !isLaptopUp,
      isLaptop: isLaptopUp && !isDesktop,
      isDesktop,
      isTabletUp,
    }),
    [isPhabletUp, isTabletUp, isLaptopUp, isDesktop],
  );
};
