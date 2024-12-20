import chalk from 'chalk';
import { IResData } from './api.service.js';
import { selectFromState } from './storage.service.js';
import { getHelpText, getWeatherText } from '../i18n/index.js';

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
  const currentLang = selectFromState('lang');

  const helpText = `\
${chalk.bgCyan(' HELP ')}
${getHelpText(currentLang, 'HELP_COMMON')}`;

  console.log(helpText);
}

export function printWeather(cityList: IResData[]) {
  const { WEATHER_IN_CITY, TEMP, FEELS_LIKE, HUMIDITY, WIND_SPEED, M_IN_S } =
    getWeatherText(selectFromState('lang'));

  cityList.forEach(data => {
    const iconCode = data.weather[0].icon.slice(0, -1) as TIconCode;

    const text = `\
${chalk.bgMagenta(' WEATHER ')}
${WEATHER_IN_CITY}: ${data.name}
${iconDict[iconCode]}  ${data.weather[0].description}
${TEMP}: ${Math.floor(data.main.temp)} (${FEELS_LIKE}: ${Math.floor(
      data.main.feels_like
    )})
${HUMIDITY}: ${data.main.humidity}%
${WIND_SPEED}: ${data.wind.speed} ${M_IN_S}`;

    console.log(text);
  });
}
