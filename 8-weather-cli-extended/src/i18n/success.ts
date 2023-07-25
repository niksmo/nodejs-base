import { TLang } from './index.js';

export type TSuccess =
  | 'TOKEN_SAVED'
  | 'CITY_SAVED'
  | 'CITY_REMOVED'
  | 'LANG_SAVED';

type TSuccessTree = {
  [key in TLang]: {
    [key in TSuccess]: string;
  };
};

export const SUCCESS: TSuccessTree = {
  en: {
    CITY_SAVED: 'Saved city:',
    CITY_REMOVED: 'Deleted city:',
    TOKEN_SAVED: 'Token saved:',
    LANG_SAVED: 'The language is set:',
  },
  ru: {
    CITY_SAVED: 'Сохранён город:',
    CITY_REMOVED: 'Удалён город:',
    TOKEN_SAVED: 'Сохранён токен:',
    LANG_SAVED: 'Установлен язык:',
  },
};
