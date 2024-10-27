const Joi = require('joi');

const userIdValidateSchema = Joi.object({
  id: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required(),  // MongoDB ObjectId pattern
});

module.exports = userIdValidateSchema;
