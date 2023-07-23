import axios, { AxiosError } from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchForcast(
  city: string,
  token: string,
  lang = 'ru',
  units = 'metrics'
) {
  try {
    const { data } = await axios.get<IResData>(API_URL, {
      params: {
        q: city,
        appid: token,
        lang,
        units,
      },
    });
    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        throw Error(err.response.data.message);
      }

      if (err.response?.status === 404) {
        throw Error(err.response.data.message);
      }
    }
    throw Error('Unexpected error');
  }
}

export interface IResData {
  coord: { lon: number; lat: number };
  weather: [{ id: number; main: string; description: string; icon: string }];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: { speed: number; deg: number; gust: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
