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
        { tasks.map(({ _id: id, name, status }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{status}</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default TodoTable;
