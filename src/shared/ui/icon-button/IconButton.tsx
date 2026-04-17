import { memo } from 'react';
import MuiIconButton, { type IconButtonProps } from '@mui/material/IconButton';

export const IconButton = memo(
  ({ className = '', ...props }: IconButtonProps) => {
    return (
      <MuiIconButton
        disableRipple
        className={`group focus-ring transition-transform transition-shadow duration-200 rounded-md ${className}`}
        {...props}
      >
        {props.children}
      </MuiIconButton>
    );
  },
);
