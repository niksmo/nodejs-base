import { TLang } from './index.js';
import { selectFromState } from '../services/storage.service.js';

const LANG = selectFromState('lang');

type TInfo =
  | 'TOKEN_PRINT'
  | 'TOKEN_NOT_SET'
  | 'CITY_ALREADY_EXIST'
  | 'CITY_NOT_EXIST'
  | 'CITY_LIST_PRINT'
  | 'CITY_LIST_EMPTY'
  | 'LANG_AVAILABLE';

type TInfoTree = {
  [key in TLang]: {
    [key in TInfo]: string;
  };
};

const InfoTree: TInfoTree = {
  en: {
    CITY_ALREADY_EXIST: 'The city is already on the list',
    CITY_LIST_PRINT: 'List of saved cities:',
    CITY_LIST_EMPTY: 'There are no cities in the list',
    CITY_NOT_EXIST: 'The specified city is not in the saved list',
    TOKEN_NOT_SET:
      'The token is not installed. Set the token with the command -t [APY_KEY]',
    TOKEN_PRINT: 'The token is installed:',
    LANG_AVAILABLE:
      'Supported languages: ["en", "ru"]. By default, "en" is set',
  },
  ru: {
    CITY_ALREADY_EXIST: 'Город уже в списке',
    CITY_LIST_PRINT: 'Список сохранённых городов:',
    CITY_LIST_EMPTY: 'В списке нет ни одного города',
    CITY_NOT_EXIST: 'Указанного города нет в списке сохранённых',
    TOKEN_NOT_SET:
      'Токен не установлен. Установите токен командой -t [APY_KEY]',
    TOKEN_PRINT: 'Установлен токен:',
    LANG_AVAILABLE:
      'Поддерживаемые языки: ["en", "ru"]. По умолчанию установлен "en"',
  },
};

const INFO = InfoTree[LANG];

export { INFO };
