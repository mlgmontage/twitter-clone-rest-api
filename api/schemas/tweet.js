const Joi = require("joi")

const schema = Joi.object({
  UserId: Joi.required(),
  Tweet: Joi.string().min(1).required()
})

module.exports = schema