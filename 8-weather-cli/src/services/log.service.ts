import chalk from 'chalk';
import { IResData } from './api.service.js';

type TIconCode = '01' | '02' | '03' | '04' | '09' | '10' | '11' | '13' | '50';

const iconMap = new Map([
  ['01', '☀️'],
  ['02', '🌤️'],
  ['03', '☁️'],
  ['04', '☁️'],
  ['09', '🌧️'],
  ['10', '🌦️'],
  ['11', '🌩️'],
  ['13', '❄️'],
  ['50', '🌫️'],
]);

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

export function printWeather(res: IResData) {
  const iconCode = res.weather[0].icon.slice(0, -1);

  const text = `\
${chalk.bgMagenta(' WEATHER ')}
Погода в городе: ${res.name}
${iconMap.get(iconCode)}  ${res.weather[0].description}
Температура: ${Math.floor(res.main.temp / 10)} (ощущается как: ${Math.floor(
    res.main.feels_like / 10
  )})
Влажность: ${res.main.humidity}%
Скорость ветра: ${res.wind.speed} м/с`;

  console.log(text);
}
