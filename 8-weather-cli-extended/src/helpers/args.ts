export const enum ArgKey {
  HELP = 'h',
  CITY_ADD = 's',
  CITY_REM = 'r',
  CITY_LIST = 'sl',
  API_KEY_SET = 't',
  API_KEY_LIST = 'tl',
  LANG = 'l',
}

export type CLargValue = string | undefined;

export function getArgs() {
  const argsMap = new Map<ArgKey, CLargValue>();

  const [exec, file, ...args] = process.argv;

  args.forEach((argVal, idx, args) => {
    if (argVal[0] === '-') {
      const inputParam = argVal.slice(1);

      if (
        inputParam === ArgKey.HELP ||
        inputParam === ArgKey.CITY_LIST ||
        inputParam === ArgKey.API_KEY_LIST
      ) {
        argsMap.set(inputParam, 'true');
      }

      if (
        inputParam === ArgKey.API_KEY_SET ||
        inputParam === ArgKey.CITY_ADD ||
        inputParam === ArgKey.CITY_REM ||
        inputParam === ArgKey.LANG
      ) {
        const nextArgV = args[idx + 1];

        argsMap.set(inputParam, nextArgV);
      }
    }
  });

  return argsMap;
}
