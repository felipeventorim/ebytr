import React, { useState } from 'react';
import PropTypes from 'prop-types';

import statusOptions from '../utils/statusOptions';

function ModalUpdate({ closeModal, taskToUpdate }) {
  const [task, setTask] = useState(taskToUpdate);

  const onChange = ({ target }) => {
    const { name, value } = target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onCloseModal = () => {
    if (task.name && task.status) closeModal(task);
  };

  return (
    <div>
      <label htmlFor="update">
        <input id="update" name="name" value={task.name} onChange={onChange} type="text" />
        <select name="status" onChange={onChange} value={task.status} id="status">
          { statusOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          )) }
        </select>
      </label>
      <button type="button" onClick={onCloseModal}>OK</button>
    </div>
  );
}

ModalUpdate.propTypes = {
  closeModal: PropTypes.func.isRequired,
  taskToUpdate: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ModalUpdate;
