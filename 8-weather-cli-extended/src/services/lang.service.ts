import { printInfo, printSuccess } from './log.service.js';
import { saveStateToFile } from './storage.service.js';

const EN = 'en';
const RU = 'ru';

export type TLang = typeof EN | typeof RU;

export async function setLanguage(value: TLang | string | undefined) {
  if (!value) {
    throw Error('Need lang param');
  }

  if (value !== EN && value !== RU) {
    printInfo('Maintain ru and en');
    return;
  }

  await saveStateToFile('lang', value);
  printSuccess('Lang set');
}
