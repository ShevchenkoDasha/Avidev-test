import type { TOptions } from 'i18next';
import { useCallback } from 'react';
import { useTranslation as useReactTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/app/store/rootReducer';
import { localeSlice } from '@/features/locale/model/locale.slice';
import type { LocaleType } from '@/features/locale/model/locale.slice.types';

export interface UseClarifyTranslationModel {
  translate: (
    key: string,
    options?: Pick<TOptions, 'replace' | 'count'>,
  ) => string;
  changeLanguage: (language: LocaleType) => void;
  currentLang: LocaleType;
}

export const useTranslation = (): UseClarifyTranslationModel => {
  const { t, i18n } = useReactTranslation();
  const dispatch = useDispatch();

  const currentLang = useSelector(
    (state: RootState) => state.locale.currentLang,
  );

  const changeLanguage = useCallback(
    (language: LocaleType) => {
      i18n.changeLanguage(language);
      dispatch(localeSlice.actions.setLanguage(language));
    },
    [i18n, dispatch],
  );

  return {
    translate: t,
    changeLanguage,
    currentLang,
  };
};
