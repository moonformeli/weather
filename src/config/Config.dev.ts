import url from 'url';

import { IAPI, IConfig } from './interfaces/IConfig';

// FIXME: API 종류별 & 프로토콜 별로 정리해서 객체로가지고 있도록 할 것
export default class ConfigDev implements IConfig {
  local: string = 'localhost';
  apiKey: string = '086008774c344048ae59c50d8234bb76';
  forecastHourlyAPI: IAPI = {
    host: 'api.weatherbit.io',
    protocol: 'http'
  };

  get Local() {
    return this.local;
  }

  get APIKey() {
    return this.apiKey;
  }

  get ForecastHourlyAPI() {
    return url.format({ ...this.forecastHourlyAPI });
  }
}
