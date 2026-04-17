import clsx from 'clsx';

import { interactiveIconColorSchemaMap } from '../constants/interactive-icon-color-schema-map.ts';
import {
  InteractiveIconTypeEnum,
  type InteractiveIconModel,
} from '../InteractiveIcon.types.ts';

interface UseInteractiveIconModel {
  className: string;
}

export const useInteractiveIconData = (
  props: InteractiveIconModel,
): UseInteractiveIconModel => {
  const type = props.type ?? InteractiveIconTypeEnum.DEFAULT;
  const colorSchema = interactiveIconColorSchemaMap[type];
  const className = clsx(
    'size-8 rounded-full transition-all outline-0',
    colorSchema.basic,
    {
      [`cursor-pointer ${colorSchema.active}`]: !props.isDisabled,
      'opacity-disabled': props.isDisabled,
    },
    props.className,
  );

  return { className };
};
