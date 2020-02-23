import Config from '@/config/Config';
import WeatherCurrentController from '@/controllers/weather/WeatherCurrentController';
import WeatherHourlyController from '@/controllers/weather/WeatherHourlyController';
import { TNext, TRequest, TResponse } from '@/models/common/interfaces/IServer';
import { IWeatherCityInterface } from '@/models/weather/interfaces/IWeatherCityInterface';
import { IWeatherCurrentInterface } from '@/models/weather/interfaces/IWeatherCurrentInterface';
import WeatherCurrentQuery from '@/query/weather/WeatherCurrentQuery';
import WeatherHourlyQuery from '@/query/weather/WeatherHourlyQuery';
import autobind from 'autobind-decorator';
import debug from 'debug';

const log = debug('Luna:WeatherRouterController');

const weatherHourlyQuery: WeatherHourlyQuery = new WeatherHourlyQuery({
  prefix: '/weather',
  baseURL: Config.ForecastHourlyAPI,
  apiKey: Config.APIKey
});
const weatherCurrentQuery: WeatherCurrentQuery = new WeatherCurrentQuery({
  prefix: '/weather',
  baseURL: Config.ForecastHourlyAPI,
  apiKey: Config.APIKey
});

export default class WeatherRouterController {
  @autobind
  async getHourlyWeather(req: TRequest, res: TResponse, next?: TNext) {
    log('getHourlyWeather');

    // TODO: FIXME: WeatherController 를 매번 생성하지 않아야하는데, 꼭 고쳐야함
    // singleton 으로 해결해야 하는 것인가 & 해결해도 되는 것인가. 고민이 필요
    const data = await new WeatherHourlyController(
      weatherHourlyQuery,
      req
    ).getHourlyWeather<IWeatherCityInterface>('Seoul');

    const hourlyWeather = data.caseOf<void, IWeatherCityInterface>({
      left: () => next?.(new Error('hourly weather data is wrong')),
      right: r => r.data
    });

    if (hourlyWeather) {
      res.json(data);
    }
  }

  @autobind
  async getCurrentWeather(req: TRequest, res: TResponse, next?: TNext) {
    log('getCurrentWeather');
    const { query } = req;

    const data = await new WeatherCurrentController(
      weatherCurrentQuery,
      req
    ).getCurrentWeather(query);

    const currentWeather = data.caseOf<void, IWeatherCurrentInterface>({
      left: () => next?.(new Error('current weather data is wrong')),
      right: r => r.data
    });

    if (currentWeather) {
      res.json(currentWeather);
    }
  }
}
