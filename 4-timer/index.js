import EventEmitter from 'node:events';
import { START, END, ERROR } from './const.js';
import { getMilliseconds, parseEntry } from './utils.js';
import { ParamsError } from './exceptions.js';

const timerEmitter = new EventEmitter();

timerEmitter.on(START, totalMs => {
  const endTime = new Date(Date.now() + totalMs);

  console.log(`Таймер установлена на ${endTime}`);

  setTimeout(() => {
    timerEmitter.emit(END, '*** ВРЕМЯ ВЫШЛО! ***');
  }, totalMs);
});

timerEmitter.on(END, msg => {
  console.log(msg);
});

timerEmitter.on(ERROR, msg => {
  console.log(msg);
});

const args = process.argv.slice(2);

(function setTimer() {
  try {
    const entries = args.map(parseEntry);

    const set = new Set();
    let totalMs = 0;

    for (const [value, type] of entries) {
      if (set.has(type)) {
        throw new ParamsError();
      }
      totalMs += getMilliseconds(value, type);
    }

    timerEmitter.emit(START, totalMs);
  } catch (error) {
    timerEmitter.emit(ERROR, error.message);
  }
})();
