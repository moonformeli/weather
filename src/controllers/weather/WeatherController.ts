import { LunaRequest } from '@/models/common/interfaces/ILunaPage';
import { IServerReq, TRequest } from '@/models/common/interfaces/IServer';
import WeatherQuery from '@/query/weather/WeatherHourlyQuery';
import IWeatherCityInterfaceJSC from '@/schemas/IWeatherCityInterfaceJSC';
import debug from 'debug';

import BaseController, { TRequestConfig } from '../common/BaseController';

const log = debug('Luna:WeatherController');

export default class WeatherController<
  R extends IServerReq
> extends BaseController<R> {
  constructor(
    private query: WeatherQuery,
    req?: LunaRequest<R> | TRequest<{}>
  ) {
    super(req);
  }

  async getCurrentWeather<T>(city: string) {
    log('getCurrentWeather');
    const url = this.query.getCityQuery(city);
    const params: TRequestConfig = {
      url,
      method: 'get'
    };
    return await this.call<T>(IWeatherCityInterfaceJSC, params);
  }
}
