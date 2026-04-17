import CircularProgress from '@mui/material/CircularProgress';
import { clsx } from 'clsx';
import { memo } from 'react';
import type { ReactNode } from 'react';

interface PropsModel {
  ariaLabel?: string;
  className?: string;
  iconClassName?: string;
  size?: number; // default size is 40
  startAdornment?: ReactNode;
}

export const CircularLoader = memo((props: PropsModel) => {
  const rootClasses = clsx('grid place-items-center', props.className);

  return (
    <div className={rootClasses} aria-label={props.ariaLabel}>
      <div className={'flex items-center gap-x-2'}>
        {props.startAdornment}
        <CircularProgress size={props.size} className={props.iconClassName} />
      </div>
    </div>
  );
});

CircularLoader.displayName = 'CircularLoader';
