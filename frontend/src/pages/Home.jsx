import React from 'react';
import Header from '../components/Header';

import SearchInput from '../components/SearchInput';
import TodoTable from '../components/TodoTable';

function Home() {
  return (
    <>
      <Header />
      <SearchInput />
      <TodoTable />
    </>
  );
}

export default Home;
