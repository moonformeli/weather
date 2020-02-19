import { validate } from './schema';

export const extendJSC = () => {
  expect.extend({
    toMatchJSC(schema: object, data: object) {
      try {
        const valid = validate(schema, data);

        if (valid) {
          return {
            message: () => `${schema} shouldn't match ${data}`,
            pass: true
          };
        }
        return {
          message: () => `${schema} should match ${data}`,
          pass: false
        };
      } catch (e) {
        return {
          message: () => `
            ${schema} doesn't match ${data}
            ${e}
          `,
          pass: false
        };
      }
    }
  });
};
