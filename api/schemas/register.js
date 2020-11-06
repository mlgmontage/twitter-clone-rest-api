const Joi = require("joi")

const schema = Joi.object({
  login: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().required(),
  name: Joi.string().alphanum().min(3).max(30).required(),
  lastname: Joi.string().alphanum().min(3).max(30).required(),
})

module.exports = schema