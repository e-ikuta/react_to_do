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

function InputTodo(props) {
  return (
    <input type="text" value={props.value} onChange={props.onChange}></input>
  );
}

function TodoList(props) {
  const todos = props.todos.map((todo) => {
    return <Todo key={todo.id} todo={todo.name} />;
  });

  return <ul>{todos}</ul>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todos,
      newTodo: '',
    };
  }

  handleClick = () => {
    const todos = this.state.todos.concat([
      {
        id: this.state.todos.length + 1,
        name: this.state.newTodo,
      }
    ]);
    this.setState({todos: todos});
  }

  handleChange = (event) => {
    this.setState({newTodo: event.target.value});
  }

  render () {
    return (
      <div>
        <InputTodo value={this.state.newTodo} onChange={this.handleChange}/>
        <AddTodo onClick={this.handleClick}/>
        <TodoList todos={this.state.todos}/>
      </div>
    );
  }
}

// ========================================

const TODOS = [
  {id: 1, name: 'Todo 1'},
  {id: 2, name: 'Todo 2'},
  {id: 3, name: 'Todo 3'},
]

ReactDOM.render(
  <App todos={TODOS} />,
  document.getElementById('root')
);
