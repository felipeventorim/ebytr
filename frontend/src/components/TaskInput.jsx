import React, { useContext, useState } from 'react';
import TodoContext from '../context/TodoContext';

function TaskInput() {
  const [taskName, setTaskName] = useState('');
  const { createNewTask } = useContext(TodoContext);

  const handleInput = ({ target }) => {
    const { value } = target;
    setTaskName(value);
  };

  const createTask = (event) => {
    event.preventDefault();
    createNewTask({ name: taskName, status: 'pendente' });

    setTaskName('');
  };

  return (
    <form onSubmit={createTask}>
      <label htmlFor="task">
        Add Task
        <input type="text" id="task" onChange={handleInput} value={taskName} />
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskInput;
