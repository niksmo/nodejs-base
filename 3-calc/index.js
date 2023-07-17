import { add } from './add.js';
import { multiply } from './multiply.js';
import { subtruct } from './subtruct.js';
import { split } from './split.js';

const OPERATION = {
  ADD: 'add',
  MULTIPLY: 'multiply',
  SUBCTRUCT: 'subtruct',
  SPLIT: 'split',
};

const servedOperators = Object.values(OPERATION);

function isServedOperator(operator) {
  return servedOperators.some(item => item === operator);
}

const a = +process.argv[2];
const b = +process.argv[3];
const operator = process.argv[4]?.toLowerCase();

(function calc() {
  if (!a || !b || !operator) {
    console.log(
      'Операторы или тип операции указаны неверно\nПример команды: node index.js 2 2 add'
    );
    return;
  }

  if (!isServedOperator(operator)) {
    console.log(
      `Калькулятор поддерживает команды: ${servedOperators.join(', ')}`
    );

    return;
  }

  let result;

  switch (operator) {
    case OPERATION.ADD:
      result = add(a, b);
      break;
    case OPERATION.MULTIPLY:
      result = multiply(a, b);
      break;
    case OPERATION.SUBCTRUCT:
      result = subtruct(a, b);
      break;
    case OPERATION.SPLIT:
      result = split(a, b);
      break;
  }

  console.log(`*** ${a} ${operator} ${b} = ${result} ***`);
})();
