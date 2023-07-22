import { HELP, CITY, API_KEY } from '../const/args.js';
import type { ArgsKeysType, ArgsValueType } from '../const/args.js';

export function getArgs() {
  const argsMap = new Map<ArgsKeysType, ArgsValueType>();

  const [exec, file, ...args] = process.argv;

  args.forEach((argVal, idx, args) => {
    if (argVal[0] === '-') {
      const inputParam = argVal[1];

      if (inputParam === HELP) {
        argsMap.set(inputParam, true);
      }

      if (inputParam === CITY || inputParam === API_KEY) {
        const nextArgV = args[idx + 1];

        argsMap.set(inputParam, nextArgV);
      }
    }
  });

  return argsMap;
}
