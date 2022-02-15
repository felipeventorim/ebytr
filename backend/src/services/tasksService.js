const { StatusCodes } = require('http-status-codes');

const tasksModel = require('../models/tasksModel');
const createTaskSchema = require('../schemas/createTaskSchema');
const deleteTaskSchema = require('../schemas/deleteTaskSchema');
const updateTaskSchema = require('../schemas/updateTaskSchema');
const errorMessages = require('../utils/dictionary/errorMessages');
const errorConstructor = require('../utils/functions/errorConstructor');

const getAllTasks = async () => {
  const tasks = await tasksModel.getAllTasks();

  return tasks;
};

const createTask = async (task) => {
  const { error } = createTaskSchema.validate(task);

  if (error) throw errorConstructor(StatusCodes.BAD_REQUEST, error.message);

  const id = tasksModel.createTask(task);

  return id;
};

const updateTask = async (task) => {
  const { error } = updateTaskSchema.validate(task);

  if (error) throw errorConstructor(StatusCodes.BAD_REQUEST, error.message);

  const isUpdated = tasksModel.updateTask(task);

  if (!isUpdated) {
    throw errorConstructor(StatusCodes.INTERNAL_SERVER_ERROR, errorMessages.serverError);
  }

  return isUpdated;
};

const deleteTask = async (id) => {
  const { error } = deleteTaskSchema.validate(id);

  if (error) throw errorConstructor(StatusCodes.BAD_REQUEST, error.message);

  const deletedTask = tasksModel.deleteTask(id);

  return deletedTask;
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
