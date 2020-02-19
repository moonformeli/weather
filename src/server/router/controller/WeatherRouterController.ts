import Config from '@/config/Config';
import WeatherController from '@/controllers/weather/WeatherController';
import { TNext, TRequest, TResponse } from '@/models/common/interfaces/IServer';
import { IWeatherCityInterface } from '@/models/weather/interfaces/IWeatherCityInterface';
import WeatherHourlyQuery from '@/query/weather/WeatherHourlyQuery';
import autobind from 'autobind-decorator';
import debug from 'debug';

const log = debug('Luna:WeatherRouterController');

export default class WeatherRouterController {
  query: WeatherHourlyQuery = new WeatherHourlyQuery({
    prefix: '/weather',
    baseURL: Config.ForecastHourlyAPI,
    apiKey: Config.APIKey
  });

  @autobind
  async getCurrentWeather(req: TRequest, res: TResponse, next?: TNext) {
    log('getCurrentWeather');

    // TODO: FIXME: WeatherController 를 매번 생성하지 않아야하는데, 꼭 고쳐야함
    // singleton 으로 해결해야 하는 것인가 & 해결해도 되는 것인가. 고민이 필요
    const data = await new WeatherController(this.query, req).getCurrentWeather<
      IWeatherCityInterface
    >('Seoul');

    const weather = data.caseOf<void, IWeatherCityInterface>({
      left: () => next?.(new Error('data is wrong')),
      right: r => r.data
    });

    if (weather) {
      res.json(data);
    }
  }
}
