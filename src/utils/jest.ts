import { validate } from './schema';

const stringify = (data: object) => JSON.stringify(data, null, 2);

export const extendJSC = () => {
  expect.extend({
    toMatchJSC(schema: object, data: object) {
      try {
        const valid = validate(schema, data);

        if (valid.valid) {
          return {
            message: () => JSON.stringify(valid.error),
            pass: true
          };
        }
        return {
          message: () => JSON.stringify(valid.error),
          pass: false
        };
      } catch (e) {
        return {
          message: () => `
            ${stringify(schema)} doesn't match ${stringify(data)}
            ${e}
          `,
          pass: false
        };
      }
    }
  });
};
