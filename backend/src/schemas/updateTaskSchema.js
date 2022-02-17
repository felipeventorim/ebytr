const Joi = require('joi');

module.exports = Joi.object({
  id: Joi.string().hex().length(24).required(),
  name: Joi.string().required(),
  status: Joi.string().required(),
});
