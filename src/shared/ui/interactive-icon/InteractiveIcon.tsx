import { memo } from 'react';
import type { InteractiveIconModel } from './InteractiveIcon.types';
import { useInteractiveIconData } from './hooks/use-interactive-icon';

export const InteractiveIcon = memo((props: InteractiveIconModel) => {
  const interactiveIconData = useInteractiveIconData(props);

  return (
    <button
      aria-label={props.ariaLabel}
      className={interactiveIconData.className}
      disabled={props.isDisabled}
      onClick={props.onClick}
      type={'button'}
    >
      {props.children}
    </button>
  );
});

InteractiveIcon.displayName = 'InteractiveIcon';
