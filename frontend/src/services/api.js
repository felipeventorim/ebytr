import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const getAllTasks = async () => {
  const { data } = await api.get('/tasks');

  return data;
};

const createTask = async (task) => {
  await api.post('/tasks/', task);
};

const updateTask = async (id, task) => {
  await api.put(`/tasks/${id}`, task);
};

const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};

export {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
