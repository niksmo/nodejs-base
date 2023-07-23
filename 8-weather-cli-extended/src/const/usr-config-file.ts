export const API_KEY_FILE_NAME = 'weather-data.json';

export const USR_CONFIG = {
  TOKEN: 'token',
  CITY: 'city',
} as const;

export type TUsrConfigFile = {
  [key in (typeof USR_CONFIG)[keyof typeof USR_CONFIG]]: string;
};
