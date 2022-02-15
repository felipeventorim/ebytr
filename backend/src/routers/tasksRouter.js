const express = require('express');

const tasksController = require('../controllers/tasksController');

const TasksRouter = express.Router();

TasksRouter.get('/', tasksController.getAllTasks);

TasksRouter.post('/', tasksController.createTask);

TasksRouter.put('/:id', tasksController.updateTask);

TasksRouter.delete('/:id', tasksController.deleteTask);

module.exports = TasksRouter;
