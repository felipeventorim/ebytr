const connection = require('./connection');

const getAllTasks = async () => {
  const db = await connection();

  const tasks = await db.collection('tasks').find().toArray();

  return tasks;
};

module.exports = {
  getAllTasks,
};
