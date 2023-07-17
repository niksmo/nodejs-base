import { EventEmitter } from 'node:events';
import { OPERATION, RESULT, ERROR } from './const.js';
import { checkInput } from './utils.js';
import { add } from './add.js';
import { multiply } from './multiply.js';
import { subtruct } from './subtruct.js';
import { split } from './split.js';

const a = +process.argv[2];
const b = +process.argv[3];
const operator = process.argv[4]?.toLowerCase();

const myEmitter = new EventEmitter();

myEmitter.on(OPERATION.ADD, (a, b) => {
  myEmitter.emit(RESULT, add(a, b));
});

myEmitter.on(OPERATION.MULTIPLY, (a, b) => {
  myEmitter.emit(RESULT, multiply(a, b));
});

myEmitter.on(OPERATION.SUBCTRUCT, (a, b) => {
  myEmitter.emit(RESULT, subtruct(a, b));
});

myEmitter.on(OPERATION.SPLIT, (a, b) => {
  myEmitter.emit(RESULT, split(a, b));
});

myEmitter.on(RESULT, data => {
  console.log(`*** Result: ${data} ***`);
});

myEmitter.on(ERROR, msg => {
  console.log(msg);
});

(function calc() {
  try {
    checkInput(a, b, operator);

    myEmitter.emit(operator, a, b);
  } catch (error) {
    myEmitter.emit(ERROR, error.message);
  }
})();
