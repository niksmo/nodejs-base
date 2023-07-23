import { TLineArgValue, ArgKey } from '../const/args.js';

export function getArgs() {
  const argsMap = new Map<ArgKey, TLineArgValue>();

  const [exec, file, ...args] = process.argv;

  args.forEach((argVal, idx, args) => {
    if (argVal[0] === '-') {
      const inputParam = argVal[1];

      if (inputParam === ArgKey.HELP) {
        argsMap.set(inputParam, 'true');
      }

      if (
        inputParam === ArgKey.API_KEY ||
        inputParam === ArgKey.CITY_ADD ||
        inputParam === ArgKey.CITY_REM
      ) {
        const nextArgV = args[idx + 1];

        argsMap.set(inputParam, nextArgV);
      }
    }
  });

  return argsMap;
}
