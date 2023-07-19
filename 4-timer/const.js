export const TYPE_IN_MS = {
  h: 1000 * 60 * 60,
  m: 1000 * 60,
  s: 1000,
};

export const START = 'start';

export const END = 'end';

export const ERROR = 'error';

export const ERR_MSG = `Передайте параметры в формате: 0h 0m 12s
Важно указывать тип передаваемой единицы: h, m или s
Программа принимает от 1 до 3 параметров, последовательность не имеет значение`;
