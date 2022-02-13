const { StatusCodes } = require('http-status-codes');

const TasksService = require('../services/TasksService');

const getAllTasks = async (req, res, next) => {
  const tasks = await TasksService.getAllTasks();

  if (!tasks.success) next(tasks);

  res.status(StatusCodes.OK).json(tasks);
};

module.exports = {
  getAllTasks,
};
