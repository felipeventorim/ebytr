const Joi = require('joi');

module.exports = Joi.string().hex().length(24).required();
