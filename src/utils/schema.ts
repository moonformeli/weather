import ajv from 'ajv';

export const validate = (schema: object, data: any) => {
  const AJV = new ajv({ allErrors: true });
  const valid = AJV.validate(schema, data);

  if (!valid && !!AJV.errors) {
    throw new Error(JSON.stringify(AJV.errors, null, 2));
  }

  return true;
};
