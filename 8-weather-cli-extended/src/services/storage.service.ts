import { homedir } from 'node:os';
import { join } from 'node:path';
import { promises } from 'node:fs';
import type { TLang } from '../i18n/index.js';

type TConfigState = {
  token: string | null;
  cities: string[];
  lang: TLang;
};

type TConfigKey = keyof TConfigState;
type TConfigValue = TConfigState[TConfigKey];

const CONFIG_FILE_NAME = 'weather-data.json';

const FILE_PATH = join(homedir(), CONFIG_FILE_NAME);

const appState: TConfigState = {
  token: null,
  cities: [],
  lang: 'en',
};

export async function initStateFromFile() {
  try {
    const configFile = await promises.readFile(FILE_PATH, { encoding: 'utf8' });
    const config: Record<string, any> = JSON.parse(configFile);
    const state = appState as unknown as Record<string, TConfigValue>;
    for (const key of Object.keys(state)) {
      if (config[key]) {
        state[key] = config[key];
      }
    }
  } catch {
    return;
  }
}

export async function saveStateToFile<TKey extends TConfigKey>(
  key: TKey,
  value: TConfigState[TKey]
) {
  appState[key] = value;

  await promises.writeFile(FILE_PATH, JSON.stringify(appState));
}

export function selectFromState<Tkey extends TConfigKey>(key: Tkey) {
  return appState[key];
}
