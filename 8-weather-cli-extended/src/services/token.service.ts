import { EXCEPTION } from '../i18n/exception.js';
import { INFO } from '../i18n/info.js';
import { SUCCESS } from '../i18n/success.js';
import { printInfo, printSuccess } from './log.service.js';
import { saveStateToFile, selectFromState } from './storage.service.js';

export function getTokenValue() {
  const token = selectFromState('token');
  if (!token) {
    printInfo(INFO.TOKEN_NOT_SET);
    return;
  }

  printInfo(INFO.TOKEN_PRINT + ' ' + token);
}

export async function setToken(value: string | undefined) {
  if (!value) {
    throw Error(EXCEPTION.TOKEN_PARAM_OMIT);
  }

  await saveStateToFile('token', value);

  printSuccess(SUCCESS.TOKEN_SAVED + ' ' + value);
}
