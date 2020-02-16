import { LunaRequest } from '@/models/common/interfaces/ILunaPage';
import WeatherQuery from '@/query/weather/WeatherHourlyQuery';
import debug from 'debug';

import BaseController, { TRequestConfig } from '../common/BaseController';

const log = debug('luna:WeatherController');

export default class WeatherController<R> extends BaseController<R> {
  constructor(private query: WeatherQuery, req: LunaRequest<R>) {
    super(req);
  }

  async getCurrentWeather<T>(city: string) {
    log('getCurrentWeather');
    const url = this.query.getCityQuery(city);
    const params: TRequestConfig = {
      method: 'get'
    };
    return await this.call<T>(url, params);
  }
}
