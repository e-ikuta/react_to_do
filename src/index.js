import React from 'react';
import ReactDOM from 'react-dom';

function Todo(props) {
  return (
    <li>{props.todo}</li>
  );
}

function TodoList(props) {
  const todos = props.todos.map((todo) => {
    return <Todo todo={todo} />;
  });

  return (
    <ul>{todos}</ul>
  );
}

// ========================================

const TODOS = [
  'Todo 1',
  'Todo 2',
  'Todo 3',
]

ReactDOM.render(
  <TodoList todos={TODOS}/>,
  document.getElementById('root')
);
