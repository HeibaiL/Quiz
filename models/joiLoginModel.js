import Joi from "@hapi/joi";

let schema = Joi.object({
  email: Joi.string()
    .min(3)
    .required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
});
export default schema;
