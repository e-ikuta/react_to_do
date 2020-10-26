import React from 'react';
import ReactDOM from 'react-dom';

function Todo(props) {
  return (
    <li>
      {props.todo.name}
      <button onClick={() => props.onDelete(props.todo.id)}>Delete</button>
      <button onClick={() => props.onDone(props.todo.id)}>Done</button>
    </li>
  );
}

function Done(props) {
  return (
    <li>
      {props.done.name}
      <button onClick={() => props.onDelete(props.done.id)}>Delete</button>
      <button onClick={() => props.onUndo(props.done.id)}>Undo</button>
    </li>
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
    return <Done key={done.id} done={done} onDelete={props.onDelete} onUndo={props.onUndo} />;
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

  handleDeleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos: todos });
  }

  handleDeleteDone = (id) => {
    const dones = this.state.dones.filter(done => done.id !== id);
    this.setState({ dones: dones });
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

  handleUndo = (id) => {
    const todo = this.state.dones.filter(done => done.id === id);
    const todos = this.state.todos.concat(todo)
    const dones = this.state.dones.filter(done => done.id !== id);
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
        <button onClick={this.handleAdd}>Add Todo</button>
        <h1>Todo</h1>
        <TodoList todos={this.state.todos} onDelete={this.handleDeleteTodo} onDone={this.handleDone}/>
        <h1>Done</h1>
        <DoneList dones={this.state.dones} onDelete={this.handleDeleteDone} onUndo={this.handleUndo} />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
