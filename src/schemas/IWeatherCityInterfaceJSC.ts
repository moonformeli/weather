export default {
  "type": "object",
  "properties": {
    "lat": {
      "type": "string"
    },
    "lon": {
      "type": "string"
    },
    "timezone": {
      "type": "string"
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
    "data": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/IWeatherData"
      }
    },
    "isError": {
      "type": "boolean"
    }
  },
  "required": [
    "city_name",
    "country_code",
    "data",
    "lat",
    "lon",
    "state_code",
    "timezone"
  ],
  "definitions": {
    "IWeatherData": {
      "description": "https://www.weatherbit.io/api/weather-forecast-120-hour",
      "type": "object",
      "properties": {
        "ts": {
          "$ref": "#/definitions/Date"
        },
        "timestamp_local": {
          "$ref": "#/definitions/Date"
        },
        "timestamp_utc": {
          "$ref": "#/definitions/Date"
        },
        "datetime": {
          "$ref": "#/definitions/Date"
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
    "Date": {
      "description": "Enables basic storage and retrieval of dates and times.",
      "type": "string",
      "format": "date-time"
    }
  },
  "$schema": "http://json-schema.org/draft-07/schema#"
}