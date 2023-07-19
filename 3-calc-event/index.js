import { EventEmitter } from 'node:events';
import { COMPUTE, RESULT, ERROR } from './const.js';
import { add } from './add.js';
import { multiply } from './multiply.js';
import { subtruct } from './subtruct.js';
import { split } from './split.js';

const OPERATION = {
  add,
  multiply,
  subtruct,
  split,
};

const [, , a, b, operator] = process.argv;

const myEmitter = new EventEmitter();

myEmitter.on(COMPUTE, (a, b, operator) => {
  myEmitter.emit(RESULT, OPERATION[operator](a, b));
});

myEmitter.on(RESULT, data => {
  console.log(`*** Result: ${data} ***`);
});

myEmitter.on(ERROR, msg => {
  console.error(msg);
});

function calc(a, b, operator) {
  if (!a || !b || !operator) {
    console.error(
      'Операторы или тип операции указаны неверно\nПример команды: node index.js 2 2 add'
    );
    return;
  }

  a = Number(a);
  b = Number(b);
  operator = operator.toLowerCase();

  try {
    myEmitter.emit(COMPUTE, a, b, operator);
  } catch (error) {
    myEmitter.emit(
      ERROR,
      `Калькулятор поддерживает команды: ${Object.keys(OPERATION).join(', ')}`
    );
  }
}

calc(a, b, operator);
