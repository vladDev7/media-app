import * as Joi from 'joi';

export default Joi.object({
  jwt_access_token_secret: Joi.string(),
  jwt_access_token_expiration_ms: Joi.number().integer(),
  jwt_refresh_token_secret: Joi.string(),
  jwt_refresh_token_expiration_ms: Joi.number().integer(),
});
