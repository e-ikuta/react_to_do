import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Todo = (props) => {
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
};

const DoneMark = (props) => {
  return (
    <button onClick={() => props.onToggle(props.id)}>
      {props.isDone ? 'DONE' : 'TODO'}
    </button>
  );
};

const Delete = (props) => {
  return <button onClick={() => props.onDelete(props.id)}>DELETE</button>;
};

const InputTodo = (props) => {
  return (
    <input type="text" value={props.value} onChange={props.onChange}></input>
  );
};

const TodoList = (props) => {
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
};

const AddTodo = (props) => {
  return (
    <div>
      <InputTodo value={props.newTodo} onChange={props.onChange} />
      <button onClick={props.onAdd}>ADD</button>
    </div>
  );
};

const App = () => {
  const [todoState, setTodoState] = useState({
    counter: 1,
    todos: [],
  });
  const [newTodo, setNewTodo] = useState('');

  const handleAdd = () => {
    const updatedTodoState = {
      counter: todoState.counter + 1,
      todos: [
        ...todoState.todos,
        {
          id: todoState.counter,
          name: newTodo,
          isDone: false,
        },
      ],
    };
    setTodoState(updatedTodoState);
    setNewTodo('');
  };

  const handleDelete = (id) => {
    const updatedTodoState = {
      counter: todoState.counter,
      todos: todoState.todos.filter((todo) => todo.id !== id),
    };
    setTodoState(updatedTodoState);
  };

  const handleToggle = (id) => {
    const updatedTodos = todoState.todos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    const updatedTodoState = {
      counter: todoState.counter,
      todos: updatedTodos,
    };
    setTodoState(updatedTodoState);
  };

  const handleChange = (event) => {
    setNewTodo(event.target.value);
  };

  return (
    <div>
      <h1>MY TODO</h1>
      <TodoList
        todos={todoState.todos}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
      <AddTodo newTodo={newTodo} onChange={handleChange} onAdd={handleAdd} />
    </div>
  );
};

// ========================================

ReactDOM.render(<App />, document.getElementById('root'));
