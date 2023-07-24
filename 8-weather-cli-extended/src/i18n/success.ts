import { TLang } from './index.js';
import { selectFromState } from '../services/storage.service.js';

const LANG = selectFromState('lang');

type TSuccess = 'TOKEN_SAVED' | 'CITY_SAVED' | 'CITY_REMOVED' | 'LANG_SAVED';

type TSuccessTree = {
  [key in TLang]: {
    [key in TSuccess]: string;
  };
};

const SuccessTree: TSuccessTree = {
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

const SUCCESS = SuccessTree[LANG];

export { SUCCESS };
