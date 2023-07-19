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

function calc(a, b, operator) {
  if (!a || !b || !operator) {
    console.log(
      'Операторы или тип операции указаны неверно\nПример команды: node index.js 2 2 add'
    );
    return;
  }

  a = Number(a);
  b = Number(b);
  operator = operator.toLowerCase();

  try {
    const result = OPERATION[operator](a, b);

    console.log(`*** ${a} ${operator} ${b} = ${result} ***`);

    return result;
  } catch {
    console.error(
      `Калькулятор поддерживает команды: ${Object.keys(OPERATION).join(', ')}`
    );
  }
}

calc(a, b, operator);
