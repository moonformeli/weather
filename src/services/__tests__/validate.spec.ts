import IWeatherCurrentInterfaceJSC from '@/schemas/IWeatherCurrentInterfaceJSC';
import { extendJSC } from '@/utils/jest';
extendJSC();

const testJSC = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    age: {
      type: 'number'
    },
    location: {
      type: 'object',
      properties: {
        city: {
          type: 'string'
        },
        country: {
          type: 'string'
        }
      },
      required: ['city', 'country']
    }
  },
  required: ['name'],
  $schema: 'http://json-schema.org/draft-07/schema#'
};

const testCurrent = {
  data: [
    {
      rh: 35,
      pod: 'd',
      lon: 126.9784,
      pres: 1028.7,
      timezone: 'Asia/Seoul',
      ob_time: '2020-02-23 02:00',
      country_code: 'KR',
      clouds: 0,
      ts: 1582423200,
      solar_rad: 599.1,
      state_code: '11',
      city_name: 'Seoul',
      wind_spd: 2.1,
      last_ob_time: '2020-02-23T02:00:00',
      wind_cdir_full: 'west',
      wind_cdir: 'W',
      slp: 1031,
      vis: 5,
      h_angle: -30,
      sunset: '09:19',
      dni: 846.65,
      dewpt: -8.3,
      snow: 0,
      uv: 4.77263,
      precip: 0,
      wind_dir: 280,
      sunrise: '22:11',
      ghi: 599.07,
      dhi: 104.36,
      aqi: 45,
      lat: 37.566,
      weather: {
        icon: 'c01d',
        code: '800',
        description: 'Clear sky'
      },
      datetime: '2020-02-23:02',
      temp: 6,
      station: 'RKSS',
      elev_angle: 36.32,
      app_temp: 4.5
    }
  ],
  count: 1
};

describe('JSC', () => {
  describe('Success', () => {
    test('sucess with proper data', () => {
      expect(testJSC).toMatchJSC({
        name: 'John',
        location: {
          city: 'Seoul',
          country: 'Korea'
        }
      });

      expect(IWeatherCurrentInterfaceJSC).toMatchJSC(testCurrent);
    });
  });
  describe('Fail', () => {
    test('fail with the lack of data', () => {
      expect(testJSC).not.toMatchJSC({});
    });
  });
});
