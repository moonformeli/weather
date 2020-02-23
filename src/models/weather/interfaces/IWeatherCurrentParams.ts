interface IWeatherCurrentCity {
  city?: string;
  state?: string;
  country?: string;
}

interface IWeatherCurrentGeoLocation {
  lat?: number;
  lon?: number;
}

interface IWeatherCurrentPoscal {
  poscal_code?: number;
  country?: string;
}

interface IWeatherCurrentCityId {
  city_id?: number;
}

interface IWeatherCurrentStation {
  station?: string;
}

export interface IWeatherCurrentParams
  extends IWeatherCurrentCity,
    IWeatherCurrentGeoLocation,
    IWeatherCurrentPoscal,
    IWeatherCurrentCityId,
    IWeatherCurrentStation {}
