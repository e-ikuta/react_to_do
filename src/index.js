import React from 'react';
import ReactDOM from 'react-dom';

function Todo(props) {
  return (
    <li>{props.todo}</li>
  );
}

function AddTodo(props) {
  return (
    <button onClick={props.onClick}>Add todo</button>
  );
}

class TodoList extends React.Component {
  render () {
    const todos = this.props.todos.map((todo) => {
      return <Todo todo={todo} />;
    });

    return (
      <ul>{todos}</ul>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todos,
    };
  }

  handleClick = () => {
    const todos = this.state.todos.concat(['Todo 4']);
    this.setState({todos: todos});
  }

  render () {
    return (
      <div>
        <AddTodo onClick={this.handleClick}/>
        <TodoList todos={this.state.todos}/>
      </div>
    );
  }
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
