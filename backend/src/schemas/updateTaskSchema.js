const Joi = require('joi');

module.exports = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  status: Joi.string().required(),
});
