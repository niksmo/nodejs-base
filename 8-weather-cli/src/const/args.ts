const HELP = 'h';
const CITY = 's';
const API_KEY = 't';

export type TArgsKey = typeof HELP | typeof CITY | typeof API_KEY;

export type TArgsValue = string | true | undefined;

export { HELP, CITY, API_KEY };
