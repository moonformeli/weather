interface IWeatherCurrentData {
  /* Latitude (Degrees). */
  lat: number;
  /* Longitude (Degrees). */
  lon: number;
  /* Sunrise time (HH:MM). */
  sunrise: string;
  /* Sunset time (HH:MM). */
  sunset: string;
  /* Local IANA Timezone. */
  timezone: string;
  /* Source station ID. */
  station: string;
  /* Last observation time (YYYY-MM-DD HH:MM). */
  ob_time: string;
  /* Current cycle hour (YYYY-MM-DD:HH). */
  datetime: string;
  /* Last observation time (Unix timestamp). */
  ts: number;
  /* City name. */
  city_name: string;
  /* Country abbreviation. */
  country_code: string;
  /* State abbreviation/code. */
  state_code: string;
  /* Pressure (mb). */
  pres: number;
  /* Sea level pressure (mb). */
  slp: number;
  /* Wind speed (Default m/s). */
  wind_spd: number;
  /* Wind direction (degrees). */
  wind_dir: number;
  /* Abbreviated wind direction. */
  wind_cdir: string;
  /* Verbal wind direction. */
  wind_cdir_full: string;
  /* Temperature (default Celcius). */
  temp: number;
  /* Apparent/"Feels Like" temperature (default Celcius). */
  app_temp: number;
  /* Relative humidity (%). */
  rh: number;
  /* Dew point (default Celcius). */
  dewpt: number;
  /* Cloud coverage (%). */
  clouds: number;
  /* Part of the day (d = day / n = night). */
  pod: string;
  weather: {
    /* Weather icon code. */
    icon: string;
    /* Weather code. */
    code: string;
    /* Text weather description. */
    description: string;
  };
  /* Visibility (default KM). */
  vis: number;
  /* Liquid equivalent precipitation rate (default mm/hr). */
  precip: number;
  /* Snowfall (default mm/hr). */
  snow: number;
  /* UV Index (0-11+). */
  uv: number;
  /* Air Quality Index [US - EPA standard 0 - +500] */
  aqi: number;
  /* Diffuse horizontal solar irradiance (W/m^2) [Clear Sky] */
  dhi: number;
  /* Direct normal solar irradiance (W/m^2) [Clear Sky] */
  dni: number;
  /* Global horizontal solar irradiance (W/m^2) [Clear Sky] */
  ghi: number;
  /* Estimated Solar Radiation (W/m^2). */
  solar_rad: number;
  /* Solar elevation angle (degrees). */
  elev_angle: number;
  /* Solar hour angle (degrees). */
  h_angle: number;
}

export interface IWeatherCurrentInterface {
  /* Count of returned observations. */
  count: number;
  data: IWeatherCurrentData[];
}
