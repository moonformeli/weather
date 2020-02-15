/**
 * https://www.weatherbit.io/api/weather-forecast-120-hour
 */
interface IWeatherData {
  /* Unix Timestamp at UTC time */
  ts: Date;
  /* Timestamp at local time */
  timestamp_local: Date;
  /* Timestamp at UTC time */
  timestamp_utc: Date;
  /* [DEPRECATED] Forecast Valid hour UTC (YYYY-MM-DD:HH) */
  datetime: Date;
  /* Wind gust speed (Default m/s) */
  wind_gust_spd: number;
  /* Wind speed (Default m/s) */
  wind_spd: number;
  /* Wind direction (degrees) */
  wind_dir: number;
  /* Abbreviated wind direction */
  wind_cdir: string;
  /* Verbal wind direction */
  wind_cdir_full: string;
  /* Temperature (default Celcius) */
  temp: number;
  /* Apparent/"Feels Like" temperature (default Celcius) */
  app_temp: number;
  /* Probability of Precipitation (% */
  pop: number;
  /* Accumulated liquid equivalent precipitation (default mm) */
  precip: number;
  /* Accumulated snowfall (default mm) */
  snow: number;
  /* Snow Depth (default mm) */
  snow_depth: number;
  /* Sea level pressure (mb) */
  slp: number;
  /* Pressure (mb) */
  pres: number;
  /* Dew point (default Celcius) */
  dewpt: number;
  /* Relative humidity (%) */
  rh: number;
  weather: {
    /* https://www.weatherbit.io/api/codes */
    icon: string;
    code: string;
    /* Text weather description */
    description: string;
  };
  /* Part of the day (d = day / n = night) */
  pod: string;
  /* Low-level (~0-3km AGL) cloud coverage (%) */
  clouds_low: number;
  /* Mid-level (~3-5km AGL) cloud coverage (%) */
  clouds_mid: number;
  /* High-level (>5km AGL) cloud coverage (%) */
  clouds_hi: number;
  /* Cloud coverage (%) */
  clouds: number;
  /* Visibility (default KM) */
  vis: number;
  /* Diffuse horizontal solar irradiance (W/m^2) [Clear Sky] */
  dhi: number;
  /* Direct normal solar irradiance (W/m^2) [Clear Sky] */
  dni: number;
  /* Global horizontal solar irradiance (W/m^2) [Clear Sky] */
  ghi: number;
  /* Estimated Solar Radiation (W/m^2) */
  solar_rad: number;
  /* UV Index (0-11+) */
  uv: number;
  /* Average Ozone (Dobson units) */
  ozone: number;
}

interface IsError {
  isError?: boolean;
}

export interface IWeatherCity extends IsError {
  /* latitude */
  lat: string;
  /* longitude */
  lon: string;
  /* local IANA Timezone */
  timezone: string;
  city_name: string;
  country_code: string;
  state_code: string;
  data: IWeatherData[];
}
