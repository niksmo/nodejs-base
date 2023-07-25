import axios, { AxiosError } from 'axios';
import { selectFromState } from './storage.service.js';
import { getExceptionText } from '../i18n/index.js';

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

export async function fetchForcast() {
  const currentLang = selectFromState('lang');

  if (!selectFromState('token')) {
    throw Error(getExceptionText(currentLang, 'TOKEN_NOT_SET'));
  }

  if (selectFromState('cities').length === 0) {
    throw Error(getExceptionText(currentLang, 'CITY_LIST_EMPTY'));
  }

  try {
    const reqList = selectFromState('cities').map(city =>
      axios
        .get<IResData>(API_URL, {
          params: {
            q: city,
            appid: selectFromState('token'),
            lang: selectFromState('lang'),
            units: 'metric',
          },
        })
        .then(({ data }) => data)
    );

    return await Promise.all(reqList);
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        throw Error(getExceptionText(currentLang, 'TOKEN_INVALID'));
      }

      if (err.response?.status === 404) {
        throw Error(getExceptionText(currentLang, 'CITY_UNMAINTAIN'));
      }
    }
    throw Error(getExceptionText(currentLang, 'UNEXPECTED'));
  }
}

export async function checkCity(cityName: string) {
  const currentLang = selectFromState('lang');

  if (!selectFromState('token')) {
    throw Error(getExceptionText(currentLang, 'TOKEN_NOT_SET'));
  }

  try {
    await axios.get<IResData>(API_URL, {
      params: {
        q: cityName,
        appid: selectFromState('token'),
        lang: selectFromState('lang'),
        units: 'metric',
      },
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        throw Error(getExceptionText(currentLang, 'TOKEN_INVALID'));
      }

      if (err.response?.status === 404) {
        throw Error(getExceptionText(currentLang, 'CITY_UNMAINTAIN'));
      }
    }
    throw Error(getExceptionText(currentLang, 'UNEXPECTED'));
  }
}
