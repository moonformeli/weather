import url from 'url';

import ConfigDev from '@/config/Config.dev';
import WeatherCurrentController from '@/controllers/weather/WeatherCurrentController';
import { IWeatherCurrentInterface } from '@/models/weather/interfaces/IWeatherCurrentInterface';
import WeatherCurrentQuery from '@/query/weather/WeatherCurrentQuery';
import IWeatherCurrentInterfaceJSC from '@/schemas/IWeatherCurrentInterfaceJSC';
import { extendJSC } from '@/utils/jest';
import qs from 'qs';

const Config = new ConfigDev();
extendJSC();

describe('WeatherCity', () => {
  describe('Get Query', () => {
    test('Can make the full query path', () => {
      const weatherQuery = new WeatherCurrentQuery({
        baseURL: Config.ForecastHourlyAPI,
        apiKey: Config.APIKey
      });
      const params = {
        city_id: 0,
        city: '',
        station: ''
      };

      const path = weatherQuery.getCurrentWeatherQuery(params);
      const query = qs.stringify({ ...params, key: Config.APIKey });
      const parsed = url.parse(path);

      expect(path).toBe(`http://api.weatherbit.io/v2.0/current?${query}`);
      expect(parsed.host).toBe(Config.forecastHourlyAPI.host);
      expect(parsed.href).toBe(path);
      expect(parsed.protocol?.replace(/\:/, '')).toBe(
        Config.forecastHourlyAPI.protocol
      );
      expect(parsed.pathname).toBe('/v2.0/current');
      expect(parsed.query).toBe(query);
    });
  });

  describe('Get API response', () => {
    test('Can get API response from server side', async done => {
      const req = jest.fn().mockImplementation(() => {
        return {
          Config
        };
      })();
      const controller = new WeatherCurrentController(
        new WeatherCurrentQuery({
          prefix: '',
          baseURL: Config.ForecastHourlyAPI,
          apiKey: Config.APIKey
        }),
        req
      );

      // FIXME: AxiosEither.do 가 생기면 caseOf --> do 로 바꾸자
      const params = { city: 'Seoul' };
      const data = await controller.getCurrentWeather<IWeatherCurrentInterface>(
        params
      );

      const weather = data.caseOf<void, IWeatherCurrentInterface>({
        left: () => {},
        right: r => r.data
      }) as IWeatherCurrentInterface;

      expect(data).toMatchSnapshot();
      expect(IWeatherCurrentInterfaceJSC).toMatchJSC(weather);
      done();
    });
  });
});
