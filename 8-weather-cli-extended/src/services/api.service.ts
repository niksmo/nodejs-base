import axios, { AxiosError } from 'axios';
import {
  CITY_UNMAINTAIN,
  INVALID_API_KEY,
  UNEXPECTED,
} from '../const/error.js';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface IResData {
  weather: [{ description: string; icon: string }];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: { speed: number };
  name: string;
  cod: number;
}

export async function fetchForcast(
  city: string[],
  token: string,
  lang = 'ru',
  units = 'metric'
) {
  try {
    const reqList = city.map(city =>
      axios
        .get<IResData>(API_URL, {
          params: {
            q: city,
            appid: token,
            lang,
            units,
          },
        })
        .then(({ data }) => data)
    );

    return await Promise.all(reqList);
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        throw Error(INVALID_API_KEY);
      }

      if (err.response?.status === 404) {
        throw Error(CITY_UNMAINTAIN);
      }
    }
    throw Error(UNEXPECTED);
  }
}
