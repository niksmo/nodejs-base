import { ArgKey, getArgs } from './helpers/args.js';
import { printError, printHelp, printWeather } from './services/log.service.js';
import { initStateFromFile } from './services/storage.service.js';
import { fetchForcast } from './services/api.service.js';
import { getTokenValue, setToken } from './services/token.service.js';
import {
  appendCity,
  getCityList,
  removeCity,
} from './services/city.service.js';
import { setLanguage } from './services/lang.service.js';

async function initCLI() {
  try {
    const args = getArgs();

    await initStateFromFile();

    if (args.has(ArgKey.LANG)) {
      await setLanguage(args.get(ArgKey.LANG));
      return;
    }

    if (args.has(ArgKey.HELP)) {
      printHelp();
      return;
    }

    if (args.has(ArgKey.API_KEY_LIST)) {
      getTokenValue();
      return;
    }

    if (args.has(ArgKey.API_KEY_SET)) {
      await setToken(args.get(ArgKey.API_KEY_SET));
      return;
    }

    if (args.has(ArgKey.CITY_ADD)) {
      await appendCity(args.get(ArgKey.CITY_ADD));
      return;
    }

    if (args.has(ArgKey.CITY_REM)) {
      await removeCity(args.get(ArgKey.CITY_REM));
      return;
    }

    if (args.has(ArgKey.CITY_LIST)) {
      getCityList();
      return;
    }

    const weather = await fetchForcast();

    printWeather(weather);
  } catch (error) {
    if (error instanceof Error) {
      printError(error.message);
    }
  }
}

initCLI();
