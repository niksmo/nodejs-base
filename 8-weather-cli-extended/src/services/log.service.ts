import chalk from 'chalk';
import { IResData } from './api.service.js';

const iconDict = {
  '01': '☀️',
  '02': '🌤️',
  '03': '☁️',
  '04': '☁️',
  '09': '🌧️',
  '10': '🌦️',
  '11': '🌩️',
  '13': '❄️',
  '50': '🌫️',
} as const;

type TIconCode = keyof typeof iconDict;

export function printError(err: string) {
  console.log(`${chalk.bgRed(' ERROR ')} ${err}`);
}

export function printInfo(msg: string) {
  console.log(`${chalk.bgBlue(' INFO ')} ${msg}`);
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

export function printWeather(res: IResData[]) {
  res.forEach(data => {
    const iconCode = data.weather[0].icon.slice(0, -1) as TIconCode;

    const text = `\
${chalk.bgMagenta(' WEATHER ')}
Погода в городе: ${data.name}
${iconDict[iconCode]}  ${data.weather[0].description}
Температура: ${Math.floor(data.main.temp)} (ощущается как: ${Math.floor(
      data.main.feels_like
    )})
Влажность: ${data.main.humidity}%
Скорость ветра: ${data.wind.speed} м/с`;

    console.log(text);
  });
}
