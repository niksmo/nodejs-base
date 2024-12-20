import {
  getExceptionText,
  getInfoText,
  getSuccessText,
} from '../i18n/index.js';
import type { CLargValue } from '../helpers/args.js';
import { checkCity } from './api.service.js';
import { printInfo, printSuccess } from './log.service.js';
import { selectFromState, saveStateToFile } from './storage.service.js';

function findCity(cityName: CLargValue) {
  const city = selectFromState('cities').find(item => item === cityName);

  return city;
}

export function getCityList() {
  const cities = selectFromState('cities');
  const currentLang = selectFromState('lang');

  if (cities.length === 0) {
    printInfo(getInfoText(currentLang, 'CITY_LIST_EMPTY'));
    return;
  }
  printInfo(
    getInfoText(currentLang, 'CITY_LIST_PRINT') + ' ' + cities.join(', ')
  );
}

export async function appendCity(value: CLargValue) {
  const currentLang = selectFromState('lang');

  if (!value) {
    throw Error(getExceptionText(currentLang, 'CITY_PARAM_OMIT'));
  }

  value = value.toLocaleLowerCase();

  const storedCity = findCity(value);

  if (storedCity) {
    printInfo(getInfoText(currentLang, 'CITY_ALREADY_EXIST'));
    return;
  }

  await checkCity(value);

  const updatedList = selectFromState('cities');

  updatedList.push(value);

  await saveStateToFile('cities', updatedList);

  printSuccess(getSuccessText(currentLang, 'CITY_SAVED') + ' ' + value);
}

export async function removeCity(value: CLargValue) {
  const currentLang = selectFromState('lang');

  if (!value) {
    throw Error(getExceptionText(currentLang, 'CITY_PARAM_OMIT'));
  }

  value = value.toLocaleLowerCase();

  const storedCity = findCity(value);

  if (!storedCity) {
    printInfo(getInfoText(currentLang, 'CITY_NOT_EXIST'));
    return;
  }

  const cityList = selectFromState('cities');

  const filteredLiset = cityList.filter(item => item !== value);

  await saveStateToFile('cities', filteredLiset);

  printSuccess(getSuccessText(currentLang, 'CITY_REMOVED') + ' ' + value);
}
