import { ParamsError } from './exceptions.js';
import { TIME } from './const.js';

export function parseEntry(str) {
  const value = parseInt(str);
  const type = str.at(-1).toLowerCase();

  if (typeof value !== 'number' || typeof str !== 'string') {
    throw new ParamsError();
  }

  return [value, type];
}

export function getMilliseconds(value, type) {
  let ms = 0;

  switch (type) {
    case TIME.HOUR:
      ms = value * 1000 * 60 * 60;
      break;
    case TIME.MIN:
      ms = value * 1000 * 60;
      break;
    case TIME.SEC:
      ms = value * 1000;
      break;
    default:
      throw new ParamsError();
  }
  return ms;
}
