import Joi from "joi";
import generalValidation from "./index";

const userValidation = {
  signup: (req, res, next) => {
    const schema = Joi.object().keys({
      firstname: Joi.string()
        .min(3)
        .required(),
      lastname: Joi.string()
        .min(3)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .required(),
      phoneNumber: Joi.string()
        .min(10)
        .required(),
      username: Joi.string()
        .min(4)
        .required()
    });
    generalValidation(req.body, schema, res, next);
  }
};

export default userValidation;
