import React from 'react';
import PropTypes from 'prop-types';

function TaskCard({ name, status }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{status}</td>
    </tr>
  );
}

TaskCard.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default TaskCard;
