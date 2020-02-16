import url from 'url';

import ConfigDev from '@/config/Config.dev';
import WeatherHoulyQuery from '@/query/weather/WeatherHourlyQuery';

const Config = new ConfigDev();

describe('WeatherCity', () => {
  describe('Get Query', () => {
    test('Can make the full query path', () => {
      const weatherQuery = new WeatherHoulyQuery({
        baseURL: Config.ForecastHourlyAPI,
        apiKey: Config.APIKey
      });

      const path = weatherQuery.getCityQuery('Seoul');
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
});

// isolatedModules 해결 방법이 없느뇨...
export {};
