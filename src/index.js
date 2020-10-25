import React from 'react';
import ReactDOM from 'react-dom';

function Todo(props) {
  return (
    <li>{props.todo}</li>
  );
}

function TodoList(props) {
  return (
    <ul>
      <Todo todo="Todo 1" />
    </ul>
  );
}

// ========================================

ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);
