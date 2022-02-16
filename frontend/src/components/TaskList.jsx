import React, { useContext, useState } from 'react';

import TodoContext from '../context/TodoContext';
import sortOptions from '../utils/sortOptions';
import Loading from './Loading';
import ModalUpdate from './ModalUpdate';
import TaskCard from './TaskCard';

import sortIcon from '../images/sortIcon.svg';

function TaskList() {
  const [modal, setModal] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState('');
  const {
    tasks,
    handleSortTasks,
    handleUpdateTask,
    handleDeleteTask,
  } = useContext(TodoContext);

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
      {modal
        && (
          <ModalUpdate
            closeModal={closeModal}
            taskToUpdate={getTask()}
          />
        )}
      <table>
        <thead>
          <tr>
            <th>Tasks</th>
          </tr>
          <tr>
            {Object.entries(sortOptions).map((option) => (
              <td key={option[0]}>
                {option[1]}
                <span aria-hidden onClick={() => handleSortTasks(option[0])}>
                  <img src={sortIcon} width="20" alt="sortIcon" />
                </span>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map(({
            _id: id,
            name,
            status,
            createdAt,
          }) => (
            <TaskCard
              key={id}
              id={id}
              name={name}
              status={status}
              createdAt={createdAt}
              updateTask={handleUpdateTaskButton}
              deleteTask={handleDeleteTaskButton}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
