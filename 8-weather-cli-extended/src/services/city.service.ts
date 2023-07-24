import { CLargValue } from '../helpers/args.js';
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
    printInfo('Cities not set');
    return;
  }
  printInfo(cities.join(', '));
}

export async function appendCity(value: CLargValue) {
  if (!value) {
    throw Error('City name not set');
  }

  value = value.toLocaleLowerCase();

  const storedCity = findCity(value);

  if (storedCity) {
    printInfo('City already set');
    return;
  }

  await checkCity(value);

  const updatedList = selectFromState('cities');

  updatedList.push(value);

  await saveStateToFile('cities', updatedList);

  printSuccess('append');
}

export async function removeCity(value: CLargValue) {
  if (!value) {
    throw Error('City name not set');
  }

  value = value.toLocaleLowerCase();

  const storedCity = findCity(value);

  if (!storedCity) {
    printInfo('City not exist in settings list');
    return;
  }

  const cityList = selectFromState('cities');

  const filteredLiset = cityList.filter(item => item !== value);

  await saveStateToFile('cities', filteredLiset);

  printSuccess('removed');
}
