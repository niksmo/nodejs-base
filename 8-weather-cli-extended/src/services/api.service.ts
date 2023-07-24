import axios, { AxiosError } from 'axios';
import { selectFromState } from './storage.service.js';
import { EXCEPTION } from '../i18n/exception.js';

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
  if (!selectFromState('token')) {
    throw Error(EXCEPTION.TOKEN_NOT_SET);
  }

  if (selectFromState('cities').length === 0) {
    throw Error(EXCEPTION.CITY_LIST_EMPTY);
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
        throw Error(EXCEPTION.TOKEN_INVALID);
      }

      if (err.response?.status === 404) {
        throw Error(EXCEPTION.CITY_UNMAINTAIN);
      }
    }
    throw Error(EXCEPTION.UNEXPECTED);
  }
}

export async function checkCity(cityName: string) {
  if (!selectFromState('token')) {
    throw Error(EXCEPTION.TOKEN_NOT_SET);
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
        throw Error(EXCEPTION.TOKEN_INVALID);
      }

      if (err.response?.status === 404) {
        throw Error(EXCEPTION.CITY_UNMAINTAIN);
      }
    }
    throw Error(EXCEPTION.UNEXPECTED);
  }
}
