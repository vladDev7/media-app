import * as Joi from "joi";

export default Joi.object({
    DB_PORT: Joi.string(),
    DB_HOST: Joi.number().integer(),
})