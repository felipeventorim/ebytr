const express = require('express');

const TasksRouter = require('./TasksRouter');

const routers = express.Router();

routers.use('/tasks', TasksRouter);

module.exports = routers;
