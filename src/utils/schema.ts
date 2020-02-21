import ajv from 'ajv';

export const validate = (schema: object, data: any) => {
  const AJV = new ajv({ allErrors: true });
  const valid = AJV.validate(schema, data);

  if (!valid && !!AJV.errors) {
    return {
      valid: false,
      error: AJV.errors
    };
  }

  return {
    valid: true,
    error: null
  };
};
