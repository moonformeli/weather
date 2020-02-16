import BaseQuery from '../common/BaseQuery';

export default class WeatherHoulyQuery extends BaseQuery {
  getCityQuery(city: string) {
    return this.getQuery({
      protocol: '',
      host: this.baseURL,
      pathname: '/v2.0/forecast/hourly',
      search: `?city=${city}&country=KR&key=${this.apiKey}`
    });
  }
}
