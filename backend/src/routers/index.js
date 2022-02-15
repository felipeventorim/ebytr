const express = require('express');

const TasksRouter = require('./tasksRouter');

const routers = express.Router();

routers.use('/tasks', TasksRouter);

module.exports = routers;
