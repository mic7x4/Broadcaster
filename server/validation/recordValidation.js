import Joi from 'joi';
import generalValidation from './index';

const recordValidation = {
  createRecord: (req, res, next) => {
    const schema = Joi.object().keys({
      owner: Joi.number().required(),
      title: Joi.string().required(),
      createdon: Joi.string().required(),
      type: Joi.string().required(),
      location: Joi.string().required(),
      comment: Joi.string().required(),
      status: Joi.string().required(),
      images: Joi.string().required(),
      videos: Joi.string().required(),
    });
    generalValidation(req.body, schema, res, next);
  },
  recordId: (req, res, next) => {
    const schema = Joi.object().keys({
      id: Joi.number().required(),
    });
    generalValidation(req.params, schema, res, next);
  },
};
export default recordValidation;
