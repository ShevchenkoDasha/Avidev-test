import MuiDrawer from '@mui/material/Drawer';
import { memo, type ReactNode, type SyntheticEvent } from 'react';

interface DrawerProps {
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  ariaLabel: string;
  children: ReactNode;
  open: boolean;
  handleClose?: (
    event: SyntheticEvent,
    reason: 'backdropClick' | 'escapeKeyDown',
  ) => void;
}

export const Drawer = memo((props: DrawerProps) => {
  return (
    <MuiDrawer
      anchor={props.anchor}
      aria-label={props.ariaLabel}
      open={props.open}
      onClose={props.handleClose}
      slotProps={{
        paper: {
          className:
            'w-[280px] p-4 flex flex-col bg-bg-secondary text-text-primary border-l border-border',
        },
      }}
    >
      {props.children}
    </MuiDrawer>
  );
});

Drawer.displayName = 'Drawer';
