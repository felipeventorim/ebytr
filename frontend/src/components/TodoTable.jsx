import React, { useContext } from 'react';

import TodoContext from '../context/TodoContext';

function TodoTable() {
  const { tasks } = useContext(TodoContext);

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
        { tasks.map((task) => (
          <tr>
            <td>{task.name}</td>
            <td>{task.status}</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default TodoTable;
