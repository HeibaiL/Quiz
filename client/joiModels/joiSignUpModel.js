import Joi from "@hapi/joi";

let schema = Joi.object({
  login: Joi.string()
    .min(2)
    .max(30)
    .required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .required(),
  name: Joi.string()
    .min(2)
    .max(30),
  email: Joi.string()
    .email({
      tlds: { allow: ["com", "net"] }
    })
    .min(3)
    .required()
});
export default schema;
