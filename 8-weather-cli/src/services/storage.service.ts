import { homedir } from 'node:os';
import { join } from 'node:path';
import { promises } from 'fs';
import { API_KEY_FILE_NAME } from '../const/file-name.js';
import type { ArgsValueType } from '../const/args.js';
import { TOKEN_MISS } from '../const/error.js';

const FILE_PATH = join(homedir(), API_KEY_FILE_NAME);

async function getExistedFile(path: string) {
  try {
    return await promises.readFile(path, { encoding: 'utf8' });
  } catch {
    return null;
  }
}

export async function saveKeyValue(key: string, value: ArgsValueType) {
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
