import React, { useContext, useState } from 'react';

import TodoContext from '../context/TodoContext';
import Loading from './Loading';
import ModalUpdate from './ModalUpdate';
import TaskCard from './TaskCard';

function TaskList() {
  const [modal, setModal] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState('');
  const { tasks, handleUpdateTask, handleDeleteTask } = useContext(TodoContext);

  const getTask = () => tasks.find(({ _id }) => _id === idToUpdate);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = (task) => {
    handleUpdateTask(task);
    setIdToUpdate('');
    setModal(false);
  };

  const handleUpdateTaskButton = ({ target }) => {
    const { id } = target.parentNode.parentNode;
    setIdToUpdate(id);
    openModal();
  };

  const handleDeleteTaskButton = ({ target }) => {
    const { id } = target.parentNode.parentNode;

    handleDeleteTask(id);
  };

  if (!tasks) <Loading />;

  return (
    <div>
      { modal
      && (
      <ModalUpdate
        closeModal={closeModal}
        taskToUpdate={getTask()}
      />
      ) }
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
            <TaskCard
              key={id}
              id={id}
              name={name}
              status={status}
              updateTask={handleUpdateTaskButton}
              deleteTask={handleDeleteTaskButton}
            />
          )) }
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
