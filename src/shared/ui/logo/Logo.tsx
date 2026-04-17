import { memo } from 'react';
import LogoSvg from '../../assets/logo.svg';

interface LogoProps {
  width?: string;
  height?: string;
  className?: string;
}

export const Logo = memo((props: LogoProps) => {
  return (
    <img
      src={LogoSvg}
      alt="Avidev"
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
});
