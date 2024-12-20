import {
  getExceptionText,
  getInfoText,
  getSuccessText,
} from '../i18n/index.js';
import { printInfo, printSuccess } from './log.service.js';
import { saveStateToFile, selectFromState } from './storage.service.js';

export function getTokenValue() {
  const token = selectFromState('token');
  const currentLang = selectFromState('lang');

  if (!token) {
    printInfo(getInfoText(currentLang, 'TOKEN_NOT_SET'));
    return;
  }

  printInfo(getInfoText(currentLang, 'TOKEN_PRINT') + ' ' + token);
}

export async function setToken(value: string | undefined) {
  const currentLang = selectFromState('lang');

  if (!value) {
    throw Error(getExceptionText(currentLang, 'TOKEN_PARAM_OMIT'));
  }

  await saveStateToFile('token', value);

  printSuccess(getSuccessText(currentLang, 'TOKEN_SAVED') + ' ' + value);
}
