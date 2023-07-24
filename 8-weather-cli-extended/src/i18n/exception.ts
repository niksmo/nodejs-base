import { TLang } from './index.js';
import { selectFromState } from '../services/storage.service.js';

const LANG = selectFromState('lang');

type TException =
  | 'TOKEN_NOT_SET'
  | 'TOKEN_INVALID'
  | 'TOKEN_PARAM_OMIT'
  | 'CITY_PARAM_OMIT'
  | 'CITY_UNMAINTAIN'
  | 'CITY_LIST_EMPTY'
  | 'LANG_PARAM_OMIT'
  | 'UNEXPECTED';

type TExceptionTree = {
  [key in TLang]: {
    [key in TException]: string;
  };
};

const ExceptionTree: TExceptionTree = {
  en: {
    TOKEN_NOT_SET:
      'The token is not installed. Set the token with the command -t [APY_KEY]',
    TOKEN_INVALID:
      'Invalid token specified. Install a new token with the command -t [APY_KEY]',
    TOKEN_PARAM_OMIT:
      'The token value is not specified. Set the token with the command -t [APY_KEY]',
    CITY_PARAM_OMIT: 'The name of the city is not specified.',
    CITY_UNMAINTAIN:
      'The specified city is not supported. Set another city with the command -s [CITY_NAME]',
    CITY_LIST_EMPTY:
      'You haven"t set a single city. Set the city with the command -s [CITY_NAME]',
    LANG_PARAM_OMIT:
      'The language parameter was not passed. Supported languages: ["en", "ru"]. By default, "en" is set',
    UNEXPECTED: 'Unexpected error.',
  },
  ru: {
    TOKEN_NOT_SET:
      'Токен не установлен. Установите токен командой -t [APY_KEY]',
    TOKEN_INVALID:
      'Указан неверный токен. Установите новый токен командой -t [APY_KEY]',
    TOKEN_PARAM_OMIT:
      'Не указано значение токена. Установите токен командой -t [APY_KEY]',
    CITY_PARAM_OMIT: 'Не указано название города.',
    CITY_UNMAINTAIN:
      'Указанный город не поддерживается. Установите другой город командой -s [CITY_NAME]',
    CITY_LIST_EMPTY:
      'Вы не задали ни один город. Установите город командой -s [CITY_NAME]',
    LANG_PARAM_OMIT:
      'Не передан параметр языка. Поддерживаемые языки: ["en", "ru"]. По умолчанию установлен "en"',
    UNEXPECTED: 'Непредвиденная ошибка.',
  },
};

const EXCEPTION = ExceptionTree[LANG];

export { EXCEPTION };
