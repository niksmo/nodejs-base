import {
  TLang,
  getExceptionText,
  getInfoText,
  getSuccessText,
  servedLangs,
} from '../i18n/index.js';
import { printInfo, printSuccess } from './log.service.js';
import { saveStateToFile, selectFromState } from './storage.service.js';

function isServedLang(value: unknown): value is TLang {
  return servedLangs.some(lang => lang === value);
}

export async function setLanguage(value: TLang | string | undefined) {
  const currentLang = selectFromState('lang');

  if (!value) {
    throw Error(getExceptionText(currentLang, 'LANG_PARAM_OMIT'));
  }

  if (!isServedLang(value)) {
    printInfo(getInfoText(currentLang, 'LANG_AVAILABLE'));
    return;
  }

  await saveStateToFile('lang', value);
  printSuccess(getSuccessText(value, 'LANG_SAVED') + ' ' + value);
}
