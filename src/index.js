import React, { useState } from 'react';
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
    return (
      <Todo
        key={todo.id}
        todo={todo}
        onDelete={props.onDelete}
        onDone={props.onDone}
      />
    );
  });

  return <ul>{todos}</ul>;
}

function DoneList(props) {
  const dones = props.dones.map((done) => {
    return (
      <Done
        key={done.id}
        done={done}
        onDelete={props.onDelete}
        onUndo={props.onUndo}
      />
    );
  });

  return <ul>{dones}</ul>;
}

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [nextId, setNextId] = useState(1);
  const [dones, setDones] = useState([]);

  const handleAdd = () => {
    const todosAlt = todos.concat([
      {
        id: nextId,
        name: newTodo,
      },
    ]);
    setTodos(todosAlt);
    setNewTodo('');
    setNextId(nextId + 1);
  };

  const handleDeleteTodo = (id) => {
    const todosAlt = todos.filter((todo) => todo.id !== id);
    setTodos(todosAlt);
  };

  const handleDeleteDone = (id) => {
    const donesAlt = dones.filter((done) => done.id !== id);
    setDones(donesAlt);
  };

  const handleDone = (id) => {
    const done = todos.filter((todo) => todo.id === id);
    const donesAlt = dones.concat(done);
    const todosAlt = todos.filter((todo) => todo.id !== id);
    setTodos(todosAlt);
    setDones(donesAlt);
  };

  const handleUndo = (id) => {
    const todo = dones.filter((done) => done.id === id);
    const todosAlt = todos.concat(todo);
    const donesAlt = dones.filter((done) => done.id !== id);
    setTodos(todosAlt);
    setDones(donesAlt);
  };

  const handleChange = (event) => {
    setNewTodo(event.target.value);
  };

  return (
    <div>
      <InputTodo value={newTodo} onChange={handleChange} />
      <button onClick={handleAdd}>Add Todo</button>
      <h1>Todo</h1>
      <TodoList todos={todos} onDelete={handleDeleteTodo} onDone={handleDone} />
      <h1>Done</h1>
      <DoneList dones={dones} onDelete={handleDeleteDone} onUndo={handleUndo} />
    </div>
  );
}

// ========================================

ReactDOM.render(<App />, document.getElementById('root'));
