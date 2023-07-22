import chalk from 'chalk';

export function printError(err: string) {
  console.log(`${chalk.bgRed(' ERROR ')} ${err}`);
}

export function printSuccess(msg: string) {
  console.log(`${chalk.bgGreen(' SUCCESS ')} ${msg}`);
}

export function printHelp() {
  const helpText = `\
${chalk.bgCyan(' HELP ')}
Без параметров - вывод погоды
-s [CITY] для установки города
-h для вывода помощи
-t [API_KEY] для сохранения токена`;

  console.log(helpText);
}
