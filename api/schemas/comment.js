const Joi = require("joi");

// Comment validator
const schema = Joi.object({
  TweetId: Joi.required(),
  UserId: Joi.required(),
  Comment: Joi.string().min(1).required(),
  Date: Joi.required(),
});

module.exports = schema;
