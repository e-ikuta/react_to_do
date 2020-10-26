import React from 'react';
import ReactDOM from 'react-dom';

function Todo(props) {
  return (
    <li>
      {props.todo.name}
      <DeleteTodo onClick={() => props.onDelete(props.todo.id)} />
      <DoneTodo onClick={() => props.onDone(props.todo.id)} />
    </li>
  );
}

function Done(props) {
  return (
    <li>
      {props.done.name}
    </li>
  );
}

function DeleteTodo(props) {
  return (
    <button onClick={props.onClick}>Delete</button>
  );
}

function DoneTodo(props) {
  return (
    <button onClick={props.onClick}>Done</button>
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
    return <Todo key={todo.id} todo={todo} onDelete={props.onDelete} onDone={props.onDone} />;
  });

  return <ul>{todos}</ul>;
}

function DoneList(props) {
  const dones = props.dones.map((done) => {
    return <Done key={done.id} done={done} onClick={props.onClick} />;
  });

  return <ul>{dones}</ul>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: '',
      nextId: 1,
      dones: [],
    };
  }

  handleAdd = () => {
    const todos = this.state.todos.concat([
      {
        id: this.state.nextId,
        name: this.state.newTodo,
      }
    ]);
    this.setState({
      todos: todos,
      newTodo: '',
      nextId: this.state.nextId + 1,
    });
  }

  handleDelete = (id) => {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos: todos });
  }

  handleDone = (id) => {
    const done = this.state.todos.filter(todo => todo.id === id);
    const dones = this.state.dones.concat(done)
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({
      todos: todos,
      dones: dones,
    });
  }

  handleChange = (event) => {
    this.setState({newTodo: event.target.value});
  }

  render () {
    return (
      <div>
        <InputTodo value={this.state.newTodo} onChange={this.handleChange}/>
        <AddTodo onClick={this.handleAdd}/>
        <h1>Todo</h1>
        <TodoList todos={this.state.todos} onDelete={this.handleDelete} onDone={this.handleDone}/>
        <h1>Done</h1>
        <DoneList dones={this.state.dones} />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
