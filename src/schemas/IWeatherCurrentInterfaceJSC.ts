export default {
  "type": "object",
  "properties": {
    "count": {
      "type": "number"
    },
    "data": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/IWeatherCurrentData"
      }
    }
  },
  "required": [
    "count",
    "data"
  ],
  "definitions": {
    "IWeatherData": {
      "description": "https://www.weatherbit.io/api/weather-forecast-120-hour",
      "type": "object",
      "properties": {
        "ts": {
          "type": "number"
        },
        "timestamp_local": {
          "type": "string"
        },
        "timestamp_utc": {
          "type": "string"
        },
        "datetime": {
          "type": "string"
        },
        "wind_gust_spd": {
          "type": "number"
        },
        "wind_spd": {
          "type": "number"
        },
        "wind_dir": {
          "type": "number"
        },
        "wind_cdir": {
          "type": "string"
        },
        "wind_cdir_full": {
          "type": "string"
        },
        "temp": {
          "type": "number"
        },
        "app_temp": {
          "type": "number"
        },
        "pop": {
          "type": "number"
        },
        "precip": {
          "type": "number"
        },
        "snow": {
          "type": "number"
        },
        "snow_depth": {
          "type": "number"
        },
        "slp": {
          "type": "number"
        },
        "pres": {
          "type": "number"
        },
        "dewpt": {
          "type": "number"
        },
        "rh": {
          "type": "number"
        },
        "weather": {
          "type": "object",
          "properties": {
            "icon": {
              "type": "string"
            },
            "code": {
              "type": "number"
            },
            "description": {
              "type": "string"
            }
          },
          "required": [
            "code",
            "description",
            "icon"
          ]
        },
        "pod": {
          "type": "string"
        },
        "clouds_low": {
          "type": "number"
        },
        "clouds_mid": {
          "type": "number"
        },
        "clouds_hi": {
          "type": "number"
        },
        "clouds": {
          "type": "number"
        },
        "vis": {
          "type": "number"
        },
        "dhi": {
          "type": "number"
        },
        "dni": {
          "type": "number"
        },
        "ghi": {
          "type": "number"
        },
        "solar_rad": {
          "type": "number"
        },
        "uv": {
          "type": "number"
        },
        "ozone": {
          "type": "number"
        }
      },
      "required": [
        "app_temp",
        "clouds",
        "clouds_hi",
        "clouds_low",
        "clouds_mid",
        "datetime",
        "dewpt",
        "dhi",
        "dni",
        "ghi",
        "ozone",
        "pod",
        "pop",
        "precip",
        "pres",
        "rh",
        "slp",
        "snow",
        "snow_depth",
        "solar_rad",
        "temp",
        "timestamp_local",
        "timestamp_utc",
        "ts",
        "uv",
        "vis",
        "weather",
        "wind_cdir",
        "wind_cdir_full",
        "wind_dir",
        "wind_gust_spd",
        "wind_spd"
      ]
    },
    "IWeatherCurrentData": {
      "type": "object",
      "properties": {
        "lat": {
          "type": "number"
        },
        "lon": {
          "type": "number"
        },
        "sunrise": {
          "type": "string"
        },
        "sunset": {
          "type": "string"
        },
        "timezone": {
          "type": "string"
        },
        "station": {
          "type": "string"
        },
        "ob_time": {
          "type": "string"
        },
        "datetime": {
          "type": "string"
        },
        "ts": {
          "type": "number"
        },
        "city_name": {
          "type": "string"
        },
        "country_code": {
          "type": "string"
        },
        "state_code": {
          "type": "string"
        },
        "pres": {
          "type": "number"
        },
        "slp": {
          "type": "number"
        },
        "wind_spd": {
          "type": "number"
        },
        "wind_dir": {
          "type": "number"
        },
        "wind_cdir": {
          "type": "string"
        },
        "wind_cdir_full": {
          "type": "string"
        },
        "temp": {
          "type": "number"
        },
        "app_temp": {
          "type": "number"
        },
        "rh": {
          "type": "number"
        },
        "dewpt": {
          "type": "number"
        },
        "clouds": {
          "type": "number"
        },
        "pod": {
          "type": "string"
        },
        "weather": {
          "type": "object",
          "properties": {
            "icon": {
              "type": "string"
            },
            "code": {
              "type": "string"
            },
            "description": {
              "type": "string"
            }
          },
          "required": [
            "code",
            "description",
            "icon"
          ]
        },
        "vis": {
          "type": "number"
        },
        "precip": {
          "type": "number"
        },
        "snow": {
          "type": "number"
        },
        "uv": {
          "type": "number"
        },
        "aqi": {
          "type": "number"
        },
        "dhi": {
          "type": "number"
        },
        "dni": {
          "type": "number"
        },
        "ghi": {
          "type": "number"
        },
        "solar_rad": {
          "type": "number"
        },
        "elev_angle": {
          "type": "number"
        },
        "h_angle": {
          "type": "number"
        }
      },
      "required": [
        "app_temp",
        "aqi",
        "city_name",
        "clouds",
        "country_code",
        "datetime",
        "dewpt",
        "dhi",
        "dni",
        "elev_angle",
        "ghi",
        "h_angle",
        "lat",
        "lon",
        "ob_time",
        "pod",
        "precip",
        "pres",
        "rh",
        "slp",
        "snow",
        "solar_rad",
        "state_code",
        "station",
        "sunrise",
        "sunset",
        "temp",
        "timezone",
        "ts",
        "uv",
        "vis",
        "weather",
        "wind_cdir",
        "wind_cdir_full",
        "wind_dir",
        "wind_spd"
      ]
    }
  },
  "$schema": "http://json-schema.org/draft-07/schema#"
}