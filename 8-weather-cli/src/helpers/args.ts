const PARAM = {
  HELP: 'h',
  CITY: 's',
  API_KEY: 't',
} as const;

type TKeys = (typeof PARAM)[keyof typeof PARAM];

const ERR_MSG = 'ERROR: Expected params -s [city] -h -t [api_key]';

export function getArgs() {
  const argsMap = new Map<TKeys, string | boolean>();

  const [exec, file, ...args] = process.argv;

  args.forEach((argVal, idx, args) => {
    if (argVal[0] === '-') {
      const inputParam = argVal[1];

      if (inputParam === PARAM.HELP) {
        argsMap.set(inputParam, true);
      }

      if (inputParam === PARAM.CITY || inputParam === PARAM.API_KEY) {
        const nextArgV = args[idx + 1];

        if (!nextArgV || nextArgV.startsWith('-')) {
          throw Error(ERR_MSG);
        }

        argsMap.set(inputParam, nextArgV);
      }
    }
  });

  return argsMap.size > 0 ? argsMap : null;
}
