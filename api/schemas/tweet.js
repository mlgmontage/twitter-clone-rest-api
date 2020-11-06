const Joi = require("joi")

const schema = Joi.object({
  UserId: Joi.string().required(),
  Tweet: Joi.string().min(5).max(256).required()
})

module.exports = schema