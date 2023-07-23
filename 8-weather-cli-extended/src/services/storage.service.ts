import { homedir } from 'node:os';
import { join } from 'node:path';
import { promises } from 'node:fs';
import {
  API_KEY_FILE_NAME,
  CLIConfigJSON,
  CLIConfigKey,
} from '../const/settings-file.js';
import {
  CITY_IS_EXIST,
  CITY_MISS_ADD,
  CITY_MISS_ENTRY,
  CITY_MISS_REM,
  TOKEN_MISS,
} from '../const/error.js';
import { TLineArgValue } from '../const/args.js';

const FILE_PATH = join(homedir(), API_KEY_FILE_NAME);

async function getExistedFile(path: string) {
  try {
    return await promises.readFile(path, { encoding: 'utf8' });
  } catch {
    return null;
  }
}

export async function findCity(value: TLineArgValue) {
  const fileData = await getExistedFile(FILE_PATH);

  if (!fileData) {
    return null;
  }

  const data: CLIConfigJSON = JSON.parse(fileData);

  if (!data.city) {
    return null;
  }

  const cityIndex = data.city.findIndex(item => item === value);

  if (cityIndex === -1) {
    return null;
  }

  return data.city[cityIndex];
}

type TSaveKeyCbFn<key> = (
  key: key,
  value: TLineArgValue,
  fileData: string | null
) => CLIConfigJSON;

export async function saveKeyValue<key extends CLIConfigKey>(
  key: key,
  value: TLineArgValue,
  cbFn: TSaveKeyCbFn<key>
) {
  const fileData = await getExistedFile(FILE_PATH);

  const data = cbFn(key, value, fileData);

  await promises.writeFile(FILE_PATH, JSON.stringify(data));

  return value;
}

export const addCity: TSaveKeyCbFn<'city'> = (key, value, fileData) => {
  if (!value) {
    throw Error(CITY_MISS_ADD);
  }

  value = value.toLowerCase();

  if (!fileData) {
    return { [key]: [value] };
  }

  const data: CLIConfigJSON = JSON.parse(fileData);

  if (!data.city) {
    data.city = [value];
    return data;
  }

  data.city.push(value);
  return data;
};

export const removeCity: TSaveKeyCbFn<'city'> = (key, value, fileData) => {
  if (!value) {
    throw Error(CITY_MISS_REM);
  }

  if (!fileData) {
    throw Error(CITY_MISS_ENTRY);
  }

  const data: CLIConfigJSON = JSON.parse(fileData);

  if (!data.city) {
    throw Error(CITY_MISS_ENTRY);
  }

  value = value.toLowerCase();

  data.city = data.city.filter(item => item !== value);

  if (data.city.length == 0) {
    delete data.city;
  }

  return data;
};

export const setToken: TSaveKeyCbFn<'token'> = (key, value, fileData) => {
  if (!value) {
    throw Error(TOKEN_MISS);
  }

  if (!fileData) {
    return { [key]: value };
  }

  const data: CLIConfigJSON = JSON.parse(fileData);
  data.token = value;

  return data;
};

export async function getTokenValue() {
  const fileData = await getExistedFile(FILE_PATH);

  if (fileData) {
    const data: CLIConfigJSON = JSON.parse(fileData);

    if (!data.token) {
      throw Error(TOKEN_MISS);
    }

    return data.token;
  }

  throw Error(TOKEN_MISS);
}

export async function getCityList() {
  const fileData = await getExistedFile(FILE_PATH);

  if (fileData) {
    const data: CLIConfigJSON = JSON.parse(fileData);

    if (!data.city) {
      throw Error(CITY_MISS_ADD);
    }

    return data.city;
  }

  throw Error(CITY_MISS_ADD);
}
