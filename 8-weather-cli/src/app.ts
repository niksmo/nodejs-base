import { getArgs } from './helpers/args.js';
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from './services/log.service.js';
import {
  getCityValue,
  getTokenValue,
  saveKeyValue,
} from './services/storage.service.js';
import { HELP, CITY, API_KEY, TArgsValue } from './const/args.js';
import { fetchForcast } from './services/api.service.js';

function saveToken(tokenValue: TArgsValue) {
  return saveKeyValue('token', tokenValue);
}

function saveCity(city: TArgsValue) {
  return saveKeyValue('city', city);
}

async function initCLI() {
  try {
    const args = getArgs();

    if (args.has(HELP)) {
      printHelp();
      return;
    }

    if (args.has(API_KEY)) {
      await saveToken(args.get(API_KEY));
      printSuccess('Token has been saved');
      return;
    }

    if (args.has(CITY)) {
      await saveCity(args.get(CITY));
      printSuccess('City has been saved');
      return;
    }

    const city = process.env.CITY || (await getCityValue());
    const token = process.env.TOKEN || (await getTokenValue());

    const weather = await fetchForcast(city, token);

    printWeather(weather);
  } catch (error) {
    if (error instanceof Error) {
      printError(error.message);
    }
  }
}

initCLI();
