import fs from 'node:fs';

const writeStream = fs.createWriteStream('./big-array.txt');

const RANGE = 9e6;

for (let i = 0; i < RANGE; i++) {
  const isNegative = Math.random() <= 0.4;

  const randomNum = Math.floor(Math.random() * 1e9);

  let result = String(isNegative ? -randomNum : randomNum);

  if (i !== RANGE - 1) {
    result = result + ' ';
  }

  writeStream.write(result);
}

writeStream.close();
