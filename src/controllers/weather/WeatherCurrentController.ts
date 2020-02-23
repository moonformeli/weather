import { LunaRequest } from '@/models/common/interfaces/ILunaPage';
import { IServerReq, TRequest } from '@/models/common/interfaces/IServer';
import { IWeatherCurrentParams } from '@/models/weather/interfaces/IWeatherCurrentParams';
import WeatherCurrentQuery from '@/query/weather/WeatherCurrentQuery';
import IWeatherCurrentInterfaceJSC from '@/schemas/IWeatherCurrentInterfaceJSC';
import debug from 'debug';

import BaseController, { TRequestConfig } from '../common/BaseController';

const log = debug('Luna:WeatherCurrentController');

export default class WeatherCurrentController<
  R extends IServerReq
> extends BaseController<R> {
  constructor(
    private query: WeatherCurrentQuery,
    req?: LunaRequest<R> | TRequest<{}>
  ) {
    super(req);
  }

  async getCurrentWeather<T>(params: IWeatherCurrentParams) {
    log('getCurrentWeather', params);
    const url = this.query.getCurrentWeatherQuery(params);
    const config: TRequestConfig = {
      url,
      method: 'get'
    };
    return await this.call<T>(IWeatherCurrentInterfaceJSC, config);
  }
}
