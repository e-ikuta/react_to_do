import React from 'react';
import ReactDOM from 'react-dom';

function Todo(props) {
  return (
    <li>
      {props.todo.name}
      <DeleteTodo onClick={() => props.onClick(props.todo.id)} />
    </li>
  );
}

function DeleteTodo(props) {
  return (
    <button onClick={props.onClick}>Delete</button>
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
    return <Todo key={todo.id} todo={todo} onClick={props.onClick} />;
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
    this.setState({
      todos: todos,
      newTodo: '',
    });
  }

  handleDelete = (id) => {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos: todos });
  }

  handleChange = (event) => {
    this.setState({newTodo: event.target.value});
  }

  render () {
    return (
      <div>
        <InputTodo value={this.state.newTodo} onChange={this.handleChange}/>
        <AddTodo onClick={this.handleClick}/>
        <TodoList todos={this.state.todos} onClick={this.handleDelete}/>
      </div>
    );
  }
}

// ========================================

const TODOS = []

ReactDOM.render(
  <App todos={TODOS} />,
  document.getElementById('root')
);
