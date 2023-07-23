import { getArgs } from './helpers/args.js';
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from './services/log.service.js';
import {
  addCity,
  findCity,
  getCityList,
  getTokenValue,
  removeCity,
  saveKeyValue,
  setToken,
} from './services/storage.service.js';
import { ArgKey } from './const/args.js';
import { fetchForcast } from './services/api.service.js';
import { CITY_IS_EXIST, CITY_MISS_ENTRY } from './const/error.js';

async function initCLI() {
  try {
    const args = getArgs();

    const cityList = await getCityList();
    const token = await getTokenValue();

    if (args.has(ArgKey.LANG)) {
    }

    if (args.has(ArgKey.HELP)) {
      printHelp();
      return;
    }

    if (args.has(ArgKey.API_KEY)) {
      await saveKeyValue('token', args.get(ArgKey.API_KEY), setToken);
      printSuccess('Token has been saved');
      return;
    }

    if (args.has(ArgKey.CITY_ADD)) {
      const newCity = args.get(ArgKey.CITY_ADD);

      const isExist = await findCity(newCity);

      if (isExist) {
        throw Error(CITY_IS_EXIST);
      }

      if (newCity) {
        await fetchForcast([newCity], token);
      }

      await saveKeyValue('city', args.get(ArgKey.CITY_ADD), addCity);
      printSuccess('City has been saved');
      return;
    }

    if (args.has(ArgKey.CITY_REM)) {
      const city = args.get(ArgKey.CITY_REM);

      const isExist = await findCity(city);

      if (!isExist) {
        throw Error(CITY_MISS_ENTRY);
      }

      await saveKeyValue('city', args.get(ArgKey.CITY_REM), removeCity);
      printSuccess(`Remove city: ${city}`);
      return;
    }

    if (args.has(ArgKey.CITY_LIST)) {
      // print city list
    }

    const weather = await fetchForcast(cityList, token);

    printWeather(weather);
  } catch (error) {
    if (error instanceof Error) {
      printError(error.message);
    }
  }
}

initCLI();
