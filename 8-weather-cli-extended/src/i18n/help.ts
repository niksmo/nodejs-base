import { TLang } from './index.js';

export type THelp = 'HELP_COMMON';

type THelpTree = {
  [key in TLang]: {
    [key in THelp]: string;
  };
};

export const HELP: THelpTree = {
  en: {
    HELP_COMMON: `\
Without parameters - weather output
-h for help output
-s [CITY] to append city in render weather list
-sl for show current city list
-t [API_KEY] to save the token (get free token on https://openweathermap.org/)
-tl for show current saved token
-l [en | ru] for change interface language`,
  },
  ru: {
    HELP_COMMON: `\
Без параметров - вывод погоды
-h для вывода помощи
-s [CITY] для установки города в список отображения погоды
-sl для вывода сохранённых городов в списке
-t [API_KEY] для сохранения токена (получите бесплатный токен на https://openweathermap.org/)
-tl для вывода сохранённого токена
-l [en | ru] для установки языка интерфейса`,
  },
};
