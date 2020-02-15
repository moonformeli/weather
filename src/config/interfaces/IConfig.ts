export interface IAPI {
  host: string;
  protocol: string;
}

export interface IConfig {
  readonly Local: string;
  readonly APIKey: string;
  readonly ForecastHourlyAPI: string;
}
