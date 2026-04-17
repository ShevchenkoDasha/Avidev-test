export interface LocaleSliceValueModel {
  currentLang: LocaleType;
}

export const LocaleTypeEnum = {
  EN: 'en',
  UA: 'ua',
} as const;

export type LocaleType = (typeof LocaleTypeEnum)[keyof typeof LocaleTypeEnum];
