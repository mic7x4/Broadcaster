import Joi from 'joi';
import generalValidation from './index';

const userValidation = {
  signup: (req, res, next) => {
    const schema = Joi.object().keys({
      firstname: Joi.string()
        .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, 'Name format')
        .min(3)
        .required()
        .trim()
        .min(3)
        .required(),
      lastname: Joi.string()
        .trim()
        .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/, 'Name format')
        .min(3)
        .required()
        .min(3)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .required(),
      phoneNumber: Joi.string()
        .regex(/^(\(\d{3}\) |\d{3}-)\d{3}-\d{4}$/)
        .default('111-222-3333'),
      username: Joi.string()
        .min(4)
        .required(),
    });
    generalValidation(req.body, schema, res, next);
  },
};

export default userValidation;
