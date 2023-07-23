export const API_KEY_FILE_NAME = 'weather-data.json';

export interface CLIConfigJSON {
  token?: string;
  city?: string[];
}

export type CLIConfigKey = keyof CLIConfigJSON;
