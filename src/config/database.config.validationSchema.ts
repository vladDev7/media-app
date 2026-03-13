import * as Joi from 'joi';

export default Joi.object({
  host: Joi.string(),
  port: Joi.number().integer(),
  url: Joi.string(),
  username: Joi.string(),
  password: Joi.string(),
});
