import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import TodoContext from './TodoContext';

axios.defaults.baseURL = '';

function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const taskRequisition = async () => {
      const { data } = await axios.get('http://localhost:3001/tasks');
      setTasks(data);
    };

    taskRequisition();
  }, []);

  const memoTasks = useMemo(() => ({ tasks }), [tasks]);

  return (
    <div>
      <TodoContext.Provider value={memoTasks}>
        {children}
      </TodoContext.Provider>
    </div>
  );
}

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TodoProvider;
