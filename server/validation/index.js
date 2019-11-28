import Joi from 'joi';

const generalValidator = (data, schema, res, next) => {
  const validation = Joi.validate(data, schema, { abortEarly: false });
  if (validation.error) {
    const { details } = validation.error;
    const errors = [];
    details.forEach((error) => {
      errors.push(error.message.split("''").join(''));
    });
    return res.status(400).json({ status: res.statusCode, error: errors });
  }
  return next();
};

export default generalValidator;
