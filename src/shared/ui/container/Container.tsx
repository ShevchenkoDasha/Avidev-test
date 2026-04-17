import { memo, type ReactNode } from 'react';

import MuiContainer, {
  type ContainerProps as MuiContainerProps,
} from '@mui/material/Container';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: MuiContainerProps['maxWidth'];
}

export const Container = memo(
  ({ children, className, maxWidth = 'lg' }: ContainerProps) => {
    return (
      <MuiContainer maxWidth={maxWidth} className={className}>
        {children}
      </MuiContainer>
    );
  },
);
