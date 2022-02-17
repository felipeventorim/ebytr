const { StatusCodes } = require('http-status-codes');

const tasksService = require('../services/tasksService');

const getAllTasks = async (_req, res, next) => {
  try {
    const tasks = await tasksService.getAllTasks();

    res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    console.log('getAllTasks => ', error.message);
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { name, status } = req.body;

    const id = await tasksService.createTask({ name, status });

    res.status(StatusCodes.CREATED).json(id);
  } catch (error) {
    console.log('createTask => ', error.message);
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    await tasksService.updateTask({ id, name, status });

    res.status(StatusCodes.OK).json();
  } catch (error) {
    console.log('updateTask => ', error.message);
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await tasksService.deleteTask(id);

    res.status(StatusCodes.OK).json(task);
  } catch (error) {
    console.log('deleteTask => ', error.message);
    next(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
