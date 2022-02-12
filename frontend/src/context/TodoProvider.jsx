import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import TodoContext from './TodoContext';

axios.defaults.baseURL = '';

function TodoProvider({ children }) {
  const [tasks] = useState([]);

  return (
    <div>
      <TodoContext.Provider value={tasks}>
        {children}
      </TodoContext.Provider>
    </div>
  );
}

TodoProvider.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export default TodoProvider;
