import { printInfo, printSuccess } from './log.service.js';
import { saveStateToFile, selectFromState } from './storage.service.js';

export function getTokenValue() {
  const token = selectFromState('token');
  if (!token) {
    printInfo('Token is not set');
    return;
  }

  printInfo(token);
}

export async function setToken(value: string | undefined) {
  if (!value) {
    throw Error('Token not set in line');
  }

  await saveStateToFile('token', value);

  printSuccess('Token set ' + value);
}
