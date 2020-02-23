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
}

const Home: LunaPage<IHomeProps> = ({ weather }) => {
  console.dir(weather);

  useEffect(() => {
    (async () => {
      const currentQuery = new WeatherCurrentQuery({});
      const currentController = new WeatherCurrentController(currentQuery);

      const res = await currentController.getCurrentWeather<
        IWeatherCurrentInterface
      >({ city: 'Seoul' });
      const current = res.caseOf<void, IWeatherCurrentInterface>({
        left: () => {},
        right: r => r.data
      });

      console.log(current);
    })();
  }, []);

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
  const defaultWeather = { weather: { isError: true } };

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
