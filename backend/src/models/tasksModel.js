const { ObjectId } = require('mongodb');

const connection = require('./connection');

const DB_COLLECTION = 'tasks';

const getAllTasks = async () => {
  const db = await connection();

  const tasks = await db.collection(DB_COLLECTION).find().toArray();

  return tasks;
};

const createTask = async (task) => {
  const db = await connection();

  const { insertedId } = await db.collection(DB_COLLECTION).insertOne(task);

  return insertedId;
};

const updateTask = async (task) => {
  const db = await connection();

  const { modifiedCount } = await db.collection(DB_COLLECTION).updateOne(
    { _id: ObjectId(task.id) },
    {
      $set: {
        name: task.name,
        status: task.status,
      },
    },
  );

  return modifiedCount;
};

const deleteTask = async (id) => {
  const db = await connection();

  const { value } = await db.collection(DB_COLLECTION).findOneAndDelete(
    { _id: ObjectId(id) },
  );

  return value;
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
