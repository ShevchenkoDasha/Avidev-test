import {
  InteractiveIconTypeEnum,
  type InteractiveIconColorSchemaModel,
  type InteractiveIconType,
} from '../InteractiveIcon.types';

export const interactiveIconColorSchemaMap: Record<
  InteractiveIconType,
  InteractiveIconColorSchemaModel
> = {
  [InteractiveIconTypeEnum.DEFAULT]: {
    active: 'hover:text-primary focus:bg-grey-septenary',
    basic: 'text-grey-secondary',
  },
  [InteractiveIconTypeEnum.PRIMARY]: {
    active: 'hover:text-green-secondary focus:bg-green-tertiary',
    basic: 'text-green-primary',
  },
  [InteractiveIconTypeEnum.INFO]: {
    active: 'hover:text-yellow-secondary focus:bg-yellow-tertiary',
    basic: 'text-yellow-primary',
  },
  [InteractiveIconTypeEnum.DANGER]: {
    active: 'hover:text-red-tertiary focus:bg-pink-primary',
    basic: 'text-red-primary',
  },
  [InteractiveIconTypeEnum.WHITE]: {
    active:
      'hover:text-blue-primary focus:bg-grey-septenary focus:text-blue-primary',
    basic: 'text-white',
  },
};
