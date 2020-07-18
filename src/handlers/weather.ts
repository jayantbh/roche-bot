import axios, { AxiosError } from 'axios';
import { RichEmbed } from 'discord.js';

import { colors } from '../constants';
import { CustomError } from '../errors';

const { WEATHER_API_KEY } = process.env;

type Kelvin = number;
type Bar = number;
type Humidity = number;
type Timestamp = number;
type HttpStatusCode = number;
type CountryCode = string;

type Weather = {
  coord: { lon: number; lat: number };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: Kelvin;
    pressure: Bar;
    humidity: Humidity;
    temp_min: Kelvin;
    temp_max: Kelvin;
    feels_like: Kelvin;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: Timestamp;
  sys: {
    type: number;
    id: number;
    message: number;
    country: CountryCode;
    sunrise: Timestamp;
    sunset: Timestamp;
  };
  id: number;
  name: string;
  cod: HttpStatusCode;
};

const weatherIcon = (code: string) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default async (query: string) => {
  try {
    const weather: Weather = await axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: query,
          appid: WEATHER_API_KEY,
        },
      })
      .then(_ => _.data);

    const weatherDetail = weather.weather[0];
    return new RichEmbed({
      title: weather.name,
      color: colors.sepia,
      thumbnail: {
        url: weatherIcon(weatherDetail.icon),
      },
      fields: [
        {
          name: 'Description',
          value: weatherDetail.description,
        },
        {
          name: 'Max',
          value: (weather.main.temp_max - 273.15).toFixed(2) + ' °C',
          inline: true,
        },
        {
          name: 'Min',
          value: (weather.main.temp_min - 273.15).toFixed(2) + ' °C',
          inline: true,
        },
        {
          name: 'Feels like',
          value: (weather.main.feels_like - 273.15).toFixed(2) + ' °C',
          inline: true,
        },
        {
          name: 'Humidity',
          value: weather.main.humidity.toString() + '%',
          inline: true,
        },
        {
          name: 'Pressure',
          value: weather.main.pressure.toString() + ' bar',
          inline: true,
        },
      ],
      footer: {
        text: 'Weather by Open Weather Map',
        icon_url:
          'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_60x60.png',
      },
    });
  } catch (_e) {
    const e = _e as AxiosError;
    console.error(e);

    if (e.response?.status === 404) {
      return new RichEmbed({
        title: 'City Not Found',
        color: 13632027,
        description:
          'Open Weather Map could not find a location for "' + query + '".',
        footer: {
          text: 'Weather by Open Weather Map',
          icon_url:
            'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_60x60.png',
        },
      });
    }

    return CustomError(
      'Response Error',
      'The Weather API errored out. Check server logs for details.'
    );
  }
};
