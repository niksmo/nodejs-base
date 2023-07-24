import { CLargValue } from '../helpers/args.js';
import { EXCEPTION } from '../i18n/exception.js';
import { INFO } from '../i18n/info.js';
import { SUCCESS } from '../i18n/success.js';
import { checkCity } from './api.service.js';
import { printInfo, printSuccess } from './log.service.js';
import { selectFromState, saveStateToFile } from './storage.service.js';

function findCity(cityName: CLargValue) {
  const city = selectFromState('cities').find(item => item === cityName);

  return city;
}

export function getCityList() {
  const cities = selectFromState('cities');

  if (cities.length === 0) {
    printInfo(INFO.CITY_LIST_EMPTY);
    return;
  }
  printInfo(INFO.CITY_LIST_PRINT + ' ' + cities.join(', '));
}

export async function appendCity(value: CLargValue) {
  if (!value) {
    throw Error(EXCEPTION.CITY_PARAM_OMIT);
  }

  value = value.toLocaleLowerCase();

  const storedCity = findCity(value);

  if (storedCity) {
    printInfo(INFO.CITY_ALREADY_EXIST);
    return;
  }

  await checkCity(value);

  const updatedList = selectFromState('cities');

  updatedList.push(value);

  await saveStateToFile('cities', updatedList);

  printSuccess(SUCCESS.CITY_SAVED + ' ' + value);
}

export async function removeCity(value: CLargValue) {
  if (!value) {
    throw Error(EXCEPTION.CITY_PARAM_OMIT);
  }

  value = value.toLocaleLowerCase();

  const storedCity = findCity(value);

  if (!storedCity) {
    printInfo(INFO.CITY_NOT_EXIST);
    return;
  }

  const cityList = selectFromState('cities');

  const filteredLiset = cityList.filter(item => item !== value);

  await saveStateToFile('cities', filteredLiset);

  printSuccess(SUCCESS.CITY_REMOVED + ' ' + value);
}
