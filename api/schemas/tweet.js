const Joi = require("joi");

// Tweet validator
const schema = Joi.object({
  UserId: Joi.required(),
  Tweet: Joi.string().min(1).required(),
  Date: Joi.required(),
});

module.exports = schema;
