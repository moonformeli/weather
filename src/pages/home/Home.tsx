import WeatherController from '@/controllers/weather/WeatherController';
import { LunaContext, LunaPage } from '@/models/common/interfaces/ILunaPage';
import { LunaReq } from '@/models/common/interfaces/IServer';
import { IWeatherCityInterface } from '@/models/weather/interfaces/IWeatherCityInterface';
import WeatherHourlyQuery from '@/query/weather/WeatherHourlyQuery';
import debug from 'debug';
import React from 'react';

import styles from './Home.scss';

const log = debug('Luna:Home');

interface IHomeProps {
  weather: IWeatherCityInterface;
}

const Home: LunaPage<IHomeProps> = ({ weather }) => {
  console.dir(weather);
  return <h1 className={styles.container}>Home</h1>;
};

Home.getInitialProps = async ({
  req
}: LunaContext<LunaReq>): Promise<IHomeProps> => {
  log('getInitialProps', !!req);
  const defaultWeather = { weather: { isError: true } };

  if (!req) {
    return defaultWeather as IHomeProps;
  }

  const query = new WeatherHourlyQuery({
    baseURL: req.Config.ForecastHourlyAPI,
    apiKey: req.Config.APIKey
  });
  const controller = new WeatherController(query, req);
  const res = await controller.getCurrentWeather<IWeatherCityInterface>(
    'Seoul'
  );

  const weather = res.caseOf<void, IWeatherCityInterface>({
    left: () => {},
    right: r => {
      return r.data;
    }
  });

  if (!weather) {
    return defaultWeather as IHomeProps;
  }

  return { weather };
};

export default Home;
