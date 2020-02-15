import url from 'url';

import autobind from 'autobind-decorator';

import BaseQuery from '../common/BaseQuery';

export default class WeatherHoulyQuery extends BaseQuery {
  // TODO: 뭔가 상당히 지저분한 방법인데 전반적인 시스템 구축 후 변경하자
  @autobind
  getCityQuery(city: string) {
    return this.getQuery({
      protocol: '',
      host: this.baseURL,
      pathname: '/v2.0/forecast/hourly',
      search: `?city=${city}&country=KR&key=${this.apiKey}`
    });
  }
}
