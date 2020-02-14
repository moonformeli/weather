import { IConfig } from './interfaces/IConfig';

export default class ConfigDev implements IConfig {
  local: string = 'localhost';
  weatherAPI: string = 'api.openweathermap.org/data/2.5/';
  apiKey: string = '443f35aaf55ede2cdbe433d76fbc31ea';

  get Local() {
    return this.local;
  }

  get APIKey() {
    return this.apiKey;
  }

  get WeatherAPI() {
    return this.weatherAPI;
  }
}
