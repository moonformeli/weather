import autobind from 'autobind-decorator';

import BaseQuery from '../common/BaseQuery';

export default class WeatherQuery extends BaseQuery {
  // TODO: 뭔가 상당히 지저분한 방법인데 전반적인 시스템 구축 후 변경하자
  @autobind
  getCityQuery(city: string) {
    return `${this.getQuery()}?q=${city}&appid=${this.apiKey}`;
  }
}
