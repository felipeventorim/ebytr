const connection = require('./connection');

const DB_COLLECTION = 'tasks';

const getAllTasks = async () => {
  const db = await connection();

  const tasks = await db.collection(DB_COLLECTION).find().toArray();

  return tasks;
};

const createTask = async (task) => {
  const db = await connection();

  const date = new Date();
  const createdAt = date.toLocaleString('pt-Br');

  const { insertedId } = await db.collection(DB_COLLECTION).insertOne({ ...task, createdAt });

  return insertedId;
};

const updateTask = async (id, name, status) => {
  const db = await connection();

  const { modifiedCount } = await db.collection(DB_COLLECTION).updateOne(
    { _id: id },
    {
      $set: { name, status },
    },
  );

  return modifiedCount;
};

const deleteTask = async (id) => {
  const db = await connection();

  const { value } = await db.collection(DB_COLLECTION).findOneAndDelete(
    { _id: id },
  );

  return value;
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
