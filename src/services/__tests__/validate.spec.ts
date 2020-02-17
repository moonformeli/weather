import IWeatherCityInterfaceJSC from '@/schemas/IWeatherCityInterfaceJSC';
import { validate } from '@/utils/schema';

const defaultWeatherData = {
  lat: '1',
  lon: '1',
  timezone: 'Asian/Seoul',
  city_name: 'Anyang',
  country_code: 'Ko',
  state_code: '2',
  data: []
};

describe('JSC', () => {
  describe('Success', () => {
    test('sucess with proper data', () => {
      expect(validate(IWeatherCityInterfaceJSC, defaultWeatherData)).toBe(true);
    });
  });
  describe('Fail', () => {
    test('fail with the lack of data', () => {
      expect(() => validate(IWeatherCityInterfaceJSC, {})).toThrow();
    });
  });
});
