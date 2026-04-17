import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  LocaleTypeEnum,
  type LocaleSliceValueModel,
  type LocaleType,
} from './locale.slice.types';

const localeSliceName = 'locale';
const localeInitialState: LocaleSliceValueModel = {
  currentLang: LocaleTypeEnum.EN,
};

const localeSlice = createSlice({
  name: localeSliceName,
  initialState: localeInitialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LocaleType>) => {
      state.currentLang = action.payload;
    },
  },
});

export { localeInitialState, localeSlice, localeSliceName };
