import { EXCEPTION, TException } from './exception.js';
import { INFO, TInfo } from './info.js';
import { SUCCESS, TSuccess } from './success.js';
import { HELP, THelp } from './help.js';
import { WEATHER } from './weather.js';

export const servedLangs = ['ru', 'en'];

export type TLang = 'ru' | 'en';

export function getExceptionText(lang: TLang, text: TException) {
  return EXCEPTION[lang][text];
}

export function getInfoText(lang: TLang, text: TInfo) {
  return INFO[lang][text];
}

export function getSuccessText(lang: TLang, text: TSuccess) {
  return SUCCESS[lang][text];
}

export function getWeatherText(lang: TLang) {
  return WEATHER[lang];
}

export function getHelpText(lang: TLang, text: THelp) {
  return HELP[lang][text];
}
