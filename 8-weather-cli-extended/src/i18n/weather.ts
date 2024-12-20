import { TLang } from './index.js';

type TWeather =
  | 'WEATHER_IN_CITY'
  | 'TEMP'
  | 'FEELS_LIKE'
  | 'HUMIDITY'
  | 'WIND_SPEED'
  | 'M_IN_S';

type TWeatherTree = {
  [key in TLang]: {
    [key in TWeather]: string;
  };
};

export const WEATHER: TWeatherTree = {
  en: {
    WEATHER_IN_CITY: 'Weather in city',
    TEMP: 'Temperature',
    FEELS_LIKE: 'feels like',
    HUMIDITY: 'Humidity',
    WIND_SPEED: 'Wind',
    M_IN_S: 'm/s',
  },
  ru: {
    WEATHER_IN_CITY: 'Погода в городе',
    TEMP: 'Температура',
    FEELS_LIKE: 'ощущается как',
    HUMIDITY: 'Влажность',
    WIND_SPEED: 'Скорость ветра',
    M_IN_S: 'м/с',
  },
};
