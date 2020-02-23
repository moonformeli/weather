import { IWeatherCurrentParams } from '@/models/weather/interfaces/IWeatherCurrentParams';
import BaseQuery from '@/query/common/BaseQuery';
import qs from 'qs';

export default class WeatherCurrentQUery extends BaseQuery {
  getCurrentWeatherQuery(params: IWeatherCurrentParams) {
    return this.getQuery({
      protocol: '',
      host: this.baseURL,
      pathname: '/v2.0/current',
      search: `?${qs.stringify({ ...params, key: this.apiKey })}`
    });
  }
}
