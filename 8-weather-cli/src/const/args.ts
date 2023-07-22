const HELP = 'h';
const CITY = 's';
const API_KEY = 't';

export type ArgsKeysType = typeof HELP | typeof CITY | typeof API_KEY;

export type ArgsValueType = string | true | undefined;

export { HELP, CITY, API_KEY };
