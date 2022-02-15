import React from 'react';
import Header from '../components/Header';

import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

function Home() {
  return (
    <>
      <Header />
      <TaskInput />
      <TaskList />
    </>
  );
}

export default Home;
