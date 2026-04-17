import type { ReactNode, MouseEvent } from 'react';

export const InteractiveIconTypeEnum = {
  DEFAULT: 'default',
  DANGER: 'danger',
  PRIMARY: 'primary',
  INFO: 'info',
  WHITE: 'white',
} as const;

export type InteractiveIconType =
  (typeof InteractiveIconTypeEnum)[keyof typeof InteractiveIconTypeEnum];

export interface InteractiveIconModel {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  type?: InteractiveIconType;
}

export interface InteractiveIconColorSchemaModel {
  basic: string;
  active: string;
}
