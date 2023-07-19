import EventEmitter from 'node:events';
import { START, END, ERROR, ERR_MSG } from './const.js';
import { getMilliseconds, parseEntry } from './utils.js';

const timerEmitter = new EventEmitter();

timerEmitter.on(START, totalMs => {
  const endTime = new Date(Date.now() + totalMs);

  console.log(`Таймер установлена на ${endTime.toLocaleString()}`);

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

function setTimer(args) {
  try {
    if (args.length < 1) {
      throw Error(ERR_MSG);
    }

    const entries = args.map(parseEntry);

    const set = new Set(); // for check unique types: 'h', 'm', 's'

    const totalMs = entries.reduce((total, entry) => {
      const [value, type] = entry;

      if (set.has(type)) {
        throw Error(ERR_MSG);
      }

      set.add(type);

      total += getMilliseconds(value, type);

      return total;
    }, 0);

    timerEmitter.emit(START, totalMs);
  } catch (err) {
    timerEmitter.emit(ERROR, err.message);
  }
}
setTimer(args);
