import * as Joi from "joi";

export default Joi.object({
    port: Joi.string(),
    host: Joi.number().integer(),
    url: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
})