import React from 'react';
import ReactDOM from 'react-dom';

function TodoList(props) {
  return (
    <ul>
      <li>Todo 1</li>
      <li>Todo 2</li>
      <li>Todo 3</li>
    </ul>
  );
}

// ========================================

ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);
