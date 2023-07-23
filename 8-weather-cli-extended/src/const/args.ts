export const HELP = 'h';
export const CITY = 's';
export const API_KEY = 't';

export type TArgsKey = typeof HELP | typeof CITY | typeof API_KEY;

export type TArgsValue = string | true | undefined;
