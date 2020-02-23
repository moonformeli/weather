import WeatherCurrentController from '@/controllers/weather/WeatherCurrentController';
import WeatherHourlyController from '@/controllers/weather/WeatherHourlyController';
import { LunaContext, LunaPage } from '@/models/common/interfaces/ILunaPage';
import { IServerReq } from '@/models/common/interfaces/IServer';
import { IWeatherCityInterface } from '@/models/weather/interfaces/IWeatherCityInterface';
import { IWeatherCurrentInterface } from '@/models/weather/interfaces/IWeatherCurrentInterface';
import WeatherCurrentQuery from '@/query/weather/WeatherCurrentQuery';
import WeatherHourlyQuery from '@/query/weather/WeatherHourlyQuery';
import debug from 'debug';
import React, { useEffect } from 'react';

import styles from './Home.scss';

const log = debug('Luna:Home');

interface IHomeProps {
  weather: IWeatherCityInterface;
  currentWeather: IWeatherCurrentInterface;
}

const Home: LunaPage<IHomeProps> = ({ weather, currentWeather }) => {
  // console.dir(weather);
  console.dir(currentWeather);

  return (
    <h1 className={styles.container}>
      {weather.city_name}
      <img src={'/static/images/a01d.png'} />
    </h1>
  );
};

Home.getInitialProps = async ({
  req
}: LunaContext<IServerReq>): Promise<IHomeProps> => {
  log('getInitialProps', !!req);
  const defaultWeather = {
    weather: { isError: true },
    currentWeather: { isError: true }
  };

  if (!req) {
    return defaultWeather as IHomeProps;
  }

  const query = new WeatherHourlyQuery({
    baseURL: req.Config.ForecastHourlyAPI,
    apiKey: req.Config.APIKey
  });
  const controller = new WeatherHourlyController(query, req);
  const res = await controller.getHourlyWeather<IWeatherCityInterface>('Seoul');
  const weather = res.caseOf<void, IWeatherCityInterface>({
    left: () => {},
    right: r => ({ ...r.data, isError: false })
  }) as IWeatherCityInterface;

  if (!weather) {
    defaultWeather.weather.isError = true;
  }

  const currentQuery = new WeatherCurrentQuery({
    baseURL: req.Config.ForecastHourlyAPI,
    apiKey: req.Config.APIKey
  });
  const currentController = new WeatherCurrentController(currentQuery, req);

  const currentRes = await currentController.getCurrentWeather<
    IWeatherCurrentInterface
  >({ city: 'Seoul' });
  const currentWeather = currentRes.caseOf<void, IWeatherCurrentInterface>({
    left: () => {},
    right: r => ({ ...r.data, isError: false })
  }) as IWeatherCurrentInterface;

  if (!currentWeather) {
    defaultWeather.currentWeather.isError = true;
  }

  // FIXME: 에러 일 때 반환하는 값에 대해서 좀 더 정리를 하자.
  return { weather, currentWeather };
};

export default Home;
