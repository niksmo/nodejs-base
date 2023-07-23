import { homedir } from 'node:os';
import { join } from 'node:path';
import { promises } from 'node:fs';
import { API_KEY_FILE_NAME, TUsrConfigFile } from '../const/usr-config-file.js';
import type { TArgsValue } from '../const/args.js';
import { CITY_FILE_MISS, TOKEN_FILE_MISS, TOKEN_MISS } from '../const/error.js';

const FILE_PATH = join(homedir(), API_KEY_FILE_NAME);

async function getExistedFile(path: string) {
  try {
    return await promises.readFile(path, { encoding: 'utf8' });
  } catch {
    return null;
  }
}

export async function saveKeyValue(
  key: keyof TUsrConfigFile,
  value: TArgsValue
) {
  if (!value) {
    throw Error(TOKEN_MISS);
  }

  const fileData = await getExistedFile(FILE_PATH);

  let data;

  if (fileData) {
    data = JSON.parse(fileData);
    data[key] = value;
  } else {
    data = { [key]: value };
  }

  await promises.writeFile(FILE_PATH, JSON.stringify(data));
}

export async function getTokenValue() {
  const fileData = await getExistedFile(FILE_PATH);

  if (fileData) {
    const data: Partial<TUsrConfigFile> = JSON.parse(fileData);

    if (!data.token) {
      throw Error(TOKEN_FILE_MISS);
    }

    return data.token;
  }

  throw Error(TOKEN_FILE_MISS);
}

export async function getCityValue() {
  const fileData = await getExistedFile(FILE_PATH);

  if (fileData) {
    const data: Partial<TUsrConfigFile> = JSON.parse(fileData);

    if (!data.city) {
      throw Error(CITY_FILE_MISS);
    }

    return data.city;
  }

  throw Error(CITY_FILE_MISS);
}
