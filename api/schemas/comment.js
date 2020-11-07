const Joi = require("joi");

const schema = Joi.object({
  TweetId: Joi.required(),
  UserId: Joi.required(),
  Comment: Joi.string().min(1).required(),
});

module.exports = schema;
