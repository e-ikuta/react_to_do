import React from 'react';
import ReactDOM from 'react-dom';

function Todo(props) {
  return (
    <li>{props.todo}</li>
  );
}

function AddTodo(props) {
  return (
    <button>Add todo</button>
  );
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todos,
    };
  }

  render () {
    const todos = this.props.todos.map((todo) => {
      return <Todo todo={todo} />;
    });

    return (
      <ul>{todos}</ul>
    );
  }
}

function App(props) {
  return (
    <div>
      <AddTodo />
      <TodoList todos={props.todos}/>
    </div>
  );
}

// ========================================

const TODOS = [
  'Todo 1',
  'Todo 2',
  'Todo 3',
]

ReactDOM.render(
  <App todos={TODOS} />,
  document.getElementById('root')
);
