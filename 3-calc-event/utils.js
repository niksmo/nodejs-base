import { OPERATION } from './const.js';

export function checkInput(a, b, operator) {
  const servedOperators = Object.values(OPERATION);

  function isServedOperator(operator) {
    return servedOperators.some(item => item === operator);
  }

  if (!a || !b || !operator) {
    throw new Error(
      'Операторы или тип операции указаны неверно\nПример команды: node index.js 2 2 add'
    );
  }

  if (!isServedOperator(operator)) {
    throw new Error(
      `Калькулятор поддерживает команды: ${servedOperators.join(', ')}`
    );
  }
}
