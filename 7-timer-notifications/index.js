import EventEmitter from 'node:events';
import notifier from 'node-notifier';
import { START, END, END_MSG, ERROR, ERR_MSG } from './const.js';
import { getMilliseconds, parseEntry, dateTimeFormatter } from './utils.js';

const timerEmitter = new EventEmitter();

timerEmitter.on(START, totalMs => {
  const endTime = new Date(Date.now() + totalMs);

  console.log(`Таймер установлена на ${dateTimeFormatter.format(endTime)}`);

  setTimeout(() => {
    timerEmitter.emit(END, END_MSG);
  }, totalMs);
});

timerEmitter.on(END, msg => {
  console.log(msg);

  notifier.notify({
    title: 'Node Timer',
    message: END_MSG,
    sound: true,
  });
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

    const set = new Set(); // checking uniques input time types: 'h', 'm', 's'

    const totalMs = entries.reduce((total, [value, type]) => {
      if (set.has(type)) {
        throw Error(ERR_MSG);
      }

      set.add(type);

      return total + getMilliseconds(value, type);
    }, 0);

    timerEmitter.emit(START, totalMs);
  } catch (err) {
    timerEmitter.emit(ERROR, err.message);
  }
}
setTimer(args);
