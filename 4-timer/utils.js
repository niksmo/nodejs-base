import { ERR_MSG, TYPE_IN_MS } from './const.js';

export const dateTimeFormatter = Intl.DateTimeFormat('ru', {
  dateStyle: 'short',
  timeStyle: 'medium',
});

export function parseEntry(str) {
  const value = parseInt(str);
  const type = str.at(-1).toLowerCase();

  if (
    typeof value !== 'number' ||
    typeof type !== 'string' ||
    !TYPE_IN_MS[type]
  ) {
    throw Error(ERR_MSG);
  }

  return [value, type];
}

export function getMilliseconds(value, type) {
  return value * TYPE_IN_MS[type];
}
