// const { StatusCodes } = require('http-status-codes');

const tasksModel = require('../models/tasksModel');

const getAllTasks = async () => {
  const tasks = await tasksModel.getAllTasks();
  // const error = {
  //   success: false,
  //   error: {
  //     status: StatusCodes.BAD_REQUEST,
  //     message: 'deu ruim',
  //   },
  // };
  return tasks;
};

module.exports = {
  getAllTasks,
};
