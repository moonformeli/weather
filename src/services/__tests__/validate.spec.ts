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
    });
  });
  describe('Fail', () => {
    test('fail with the lack of data', () => {
      expect(testJSC).not.toMatchJSC({});
    });
  });
});
