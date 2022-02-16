import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/api';
import sortOptions from '../utils/sortOptions';

import TodoContext from './TodoContext';

const ALPHABETICAL_ORDER = Object.keys(sortOptions)[0];

function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [sortMethod, setSortMethod] = useState({ sortBy: ALPHABETICAL_ORDER, ordered: true });

  const sortTasks = (data) => {
    const { sortBy, ordered } = sortMethod;
    data.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (b[sortBy] > a[sortBy]) return 1;
      return 0;
    });
    if (ordered) data.reverse();
  };

  useEffect(() => {
    const getTasks = async () => {
      const data = await getAllTasks();
      sortTasks(data);
      setTasks(data);
    };

    getTasks();
  }, []);

  const getUpdatedTasks = async () => {
    const data = await getAllTasks();
    sortTasks(data);
    setTasks(data);
  };

  useEffect(() => getUpdatedTasks(), [sortMethod]);

  const handleSortTasks = async (sortBy) => {
    if (sortBy === sortMethod.sortBy) {
      setSortMethod((prevState) => ({ sortBy, ordered: !prevState.ordered }));
    } else setSortMethod({ sortBy, ordered: true });
  };

  const handleCreateTask = async (task) => {
    await createTask(task);
    await getUpdatedTasks();
  };

  const handleUpdateTask = async (task) => {
    const { _id: id, ...updatedTask } = task;
    await updateTask(id, updatedTask);
    await getUpdatedTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    await getUpdatedTasks();
  };

  const context = useMemo(() => ({
    tasks,
    handleSortTasks,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
  }), [tasks]);

  return (
    <div>
      <TodoContext.Provider value={context}>
        {children}
      </TodoContext.Provider>
    </div>
  );
}

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TodoProvider;
