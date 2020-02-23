import { LunaRequest } from '@/models/common/interfaces/ILunaPage';
import { IServerReq, TRequest } from '@/models/common/interfaces/IServer';
import WeatherHourlyQuery from '@/query/weather/WeatherHourlyQuery';
import IWeatherCityInterfaceJSC from '@/schemas/IWeatherCityInterfaceJSC';
import debug from 'debug';

import BaseController, { TRequestConfig } from '../common/BaseController';

const log = debug('Luna:WeatherController');

export default class WeatherHourlyController<
  R extends IServerReq
> extends BaseController<R> {
  constructor(
    private query: WeatherHourlyQuery,
    req?: LunaRequest<R> | TRequest<{}>
  ) {
    super(req);
  }

  async getHourlyWeather<T>(city: string) {
    log('getHourlyWeather');
    const url = this.query.getHourlyWeatherQuery(city);
    const params: TRequestConfig = {
      url,
      method: 'get'
    };
    return await this.call<T>(IWeatherCityInterfaceJSC, params);
  }
}
