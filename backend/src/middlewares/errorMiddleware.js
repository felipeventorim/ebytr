const { StatusCodes } = require('http-status-codes');

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, _req, res, _next) => {
  console.log('error', err.message);
  if (err.status) return res.status(err.status).json(err.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
};

module.exports = errorMiddleware;
