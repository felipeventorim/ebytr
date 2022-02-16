import React from 'react';
import PropTypes from 'prop-types';

function TaskCard({
  id,
  name,
  status,
  createdAt,
  updateTask,
  deleteTask,
}) {
  return (
    <tr id={id}>
      <td>{name}</td>
      <td>{status}</td>
      <td>{createdAt}</td>
      <td><button type="button" onClick={updateTask}>edit</button></td>
      <td><button type="button" onClick={deleteTask}>X</button></td>
    </tr>
  );
}

TaskCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskCard;
