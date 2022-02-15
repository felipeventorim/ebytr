import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { getAllTasks, createTask } from '../services/api';

import TodoContext from './TodoContext';

function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const data = await getAllTasks();

      setTasks(data);
    };

    getTasks();
  }, []);

  const getUpdatedTasks = async () => {
    const data = await getAllTasks();

    setTasks(data);
  };

  const createNewTask = async (task) => {
    await createTask(task);
    await getUpdatedTasks();
  };

  const context = useMemo(() => ({
    tasks,
    createNewTask,
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
