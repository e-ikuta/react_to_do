import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Todo(props) {
  return (
    <li>
      <DoneMark
        id={props.todo.id}
        isDone={props.todo.isDone}
        onToggle={props.onToggle}
      />
      {props.todo.name}
      <Delete id={props.todo.id} onDelete={props.onDelete} />
    </li>
  );
}

function DoneMark(props) {
  return (
    <button onClick={() => props.onToggle(props.id)}>
      {props.isDone ? 'DONE' : 'TODO'}
    </button>
  );
}

function Delete(props) {
  return <button onClick={() => props.onDelete(props.id)}>DELETE</button>;
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
        onToggle={props.onToggle}
        onDelete={props.onDelete}
      />
    );
  });

  return <ul>{todos}</ul>;
}

function AddTodo(props) {
  return (
    <div>
      <InputTodo value={props.newTodo} onChange={props.onChange} />
      <button onClick={props.onAdd}>ADD</button>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [nextId, setNextId] = useState(1);

  const handleAdd = () => {
    const addedTodos = todos.concat([
      {
        id: nextId,
        name: newTodo,
        isDone: false,
      },
    ]);
    setTodos(addedTodos);
    setNewTodo('');
    setNextId(nextId + 1);
  };

  const handleDelete = (id) => {
    const remainingTodos = todos.filter((todo) => todo.id !== id);
    setTodos(remainingTodos);
  };

  const handleToggle = (id) => {
    const toggledTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodos(toggledTodos);
  };

  const handleChange = (event) => {
    setNewTodo(event.target.value);
  };

  return (
    <div>
      <h1>MY TODO</h1>
      <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
      <AddTodo newTodo={newTodo} onChange={handleChange} onAdd={handleAdd} />
    </div>
  );
}

// ========================================

ReactDOM.render(<App />, document.getElementById('root'));
