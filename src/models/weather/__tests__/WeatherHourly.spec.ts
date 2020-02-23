import url from 'url';

import ConfigDev from '@/config/Config.dev';
import WeatherHourlyController from '@/controllers/weather/WeatherHourlyController';
import { IWeatherCityInterface } from '@/models/weather/interfaces/IWeatherCityInterface';
import WeatherHoulyQuery from '@/query/weather/WeatherHourlyQuery';
import IWeatherCityInterfaceJSC from '@/schemas/IWeatherCityInterfaceJSC';
import { extendJSC } from '@/utils/jest';

const Config = new ConfigDev();
extendJSC();

describe('WeatherCity', () => {
  describe('Get Query', () => {
    test('Can make the full query path', () => {
      const weatherQuery = new WeatherHoulyQuery({
        baseURL: Config.ForecastHourlyAPI,
        apiKey: Config.APIKey
      });

      const path = weatherQuery.getHourlyWeatherQuery('Seoul');
      const parsed = url.parse(path);

      expect(path).toBe(
        'http://api.weatherbit.io/v2.0/forecast/hourly?city=Seoul&country=KR&key=086008774c344048ae59c50d8234bb76'
      );
      expect(parsed.host).toBe(Config.forecastHourlyAPI.host);
      expect(parsed.href).toBe(path);
      expect(parsed.protocol?.replace(/\:/, '')).toBe(
        Config.forecastHourlyAPI.protocol
      );
      expect(parsed.pathname).toBe('/v2.0/forecast/hourly');
      expect(parsed.query).toBe(
        'city=Seoul&country=KR&key=086008774c344048ae59c50d8234bb76'
      );
    });
  });

  describe('Get API response', () => {
    test('Can get API response from server side', async done => {
      const req = jest.fn().mockImplementation(() => {
        return {
          Config
        };
      })();
      const controller = new WeatherHourlyController(
        new WeatherHoulyQuery({
          prefix: '',
          baseURL: Config.ForecastHourlyAPI,
          apiKey: Config.APIKey
        }),
        req
      );

      // FIXME: AxiosEither.do 가 생기면 caseOf --> do 로 바꾸자
      const data = await controller.getHourlyWeather<IWeatherCityInterface>(
        'Seoul'
      );

      const weather = data.caseOf<void, IWeatherCityInterface>({
        left: () => {},
        right: r => r.data
      }) as IWeatherCityInterface;

      expect(data).toMatchSnapshot();
      expect(IWeatherCityInterfaceJSC).toMatchJSC(weather);
      done();
    });
  });
});

// isolatedModules 해결 방법이 없느뇨...
export {};
