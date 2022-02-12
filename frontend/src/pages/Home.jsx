import React from 'react';

import SearchInput from '../components/SearchInput';
import TodoTable from '../components/TodoTable';

function Home() {
  return (
    <div>
      <h2>Todo List</h2>
      <SearchInput />
      <TodoTable />
    </div>
  );
}

export default Home;
