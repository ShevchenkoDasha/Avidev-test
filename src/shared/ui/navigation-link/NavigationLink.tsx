import { handleKeyDownEnterSpace } from '@/shared/helpers/keyboard_handlers';
import { clsx } from 'clsx';
import { type HTMLAttributeAnchorTarget, memo, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface PropsModel {
  children: ReactNode;
  target?: HTMLAttributeAnchorTarget;
  classes?: string;
  rel?: string;
  to: string;
}

const NavigationLink = memo((props: PropsModel) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    handleKeyDownEnterSpace(event, () => {
      event.preventDefault();
      (event.currentTarget as HTMLElement).click();
    });
  };

  return (
    <NavLink
      to={props.to}
      data-testid="navigation-link"
      className={({ isActive }) =>
        clsx(
          'flex items-center gap-x-1 focus-ring px-2 py-1 rounded transition-colors duration-200 inline-flex text-md',
          {
            'text-text-secondary hover:text-white': !isActive,
            'text-accent': isActive,
          },
          props.classes,
        )
      }
      target={props.target}
      rel={props.rel}
      onKeyDown={handleKeyDown}
    >
      <div className="font-bold">{props.children}</div>
    </NavLink>
  );
});

NavigationLink.displayName = 'NavigationLink';

export default NavigationLink;
