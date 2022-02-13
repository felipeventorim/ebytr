const express = require('express');

const TasksController = require('../controllers/TasksController');

const TasksRouter = express.Router();

TasksRouter.get('/', TasksController.getAllTasks);

module.exports = TasksRouter;
