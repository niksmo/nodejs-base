import { EXCEPTION } from '../i18n/exception.js';
import { TLang } from '../i18n/index.js';
import { INFO } from '../i18n/info.js';
import { SUCCESS } from '../i18n/success.js';
import { printInfo, printSuccess } from './log.service.js';
import { saveStateToFile } from './storage.service.js';

export async function setLanguage(value: TLang | string | undefined) {
  if (!value) {
    throw Error(EXCEPTION.LANG_PARAM_OMIT);
  }

  if (value !== TLang.en && value !== TLang.ru) {
    printInfo(INFO.LANG_AVAILABLE);
    return;
  }

  await saveStateToFile('lang', value);
  printSuccess(SUCCESS.LANG_SAVED + ' ' + value);
}
