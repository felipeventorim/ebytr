import React, { useContext } from 'react';

import TodoContext from '../context/TodoContext';
import Loading from './Loading';
import TaskCard from './TaskCard';

function TaskList() {
  const { tasks } = useContext(TodoContext);

  if (!tasks || !tasks.length) <Loading />;

  return (
    <table>
      <thead>
        <tr>
          <th>Tasks</th>
        </tr>
        <tr>
          <td>Name</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody>
        { tasks.map(({ _id: id, name, status }) => (
          <TaskCard key={id} name={name} status={status} />
        )) }
      </tbody>
    </table>
  );
}

export default TaskList;
