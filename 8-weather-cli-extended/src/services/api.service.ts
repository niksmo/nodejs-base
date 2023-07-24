import axios, { AxiosError } from 'axios';
import { selectFromState } from './storage.service.js';

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
    throw Error('Token doesn"t set');
  }

  if (selectFromState('cities').length === 0) {
    throw Error('Cites doesn"t set');
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
        throw Error('INVALID_API_KEY');
      }

      if (err.response?.status === 404) {
        throw Error('CITY_UNMAINTAIN');
      }
    }
    throw Error('Unexpected error');
  }
}

export async function checkCity(cityName: string) {
  if (!selectFromState('token')) {
    throw Error('Token doesn"t set');
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
        throw Error('INVALID_API_KEY');
      }

      if (err.response?.status === 404) {
        throw Error('CITY_UNMAINTAIN');
      }
    }
    throw Error('UNEXPECTED');
  }
}
