import React, { useReducer, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { todoReducer } from './todo-reducer.js';

const Todo = (props) => {
  return (
    <li>
      <DoneMark
        id={props.todo.id}
        isDone={props.todo.isDone}
        handleToggle={props.handleToggle}
      />
      {props.todo.name}
      <Delete id={props.todo.id} handleDelete={props.handleDelete} />
    </li>
  );
};

const DoneMark = (props) => {
  return (
    <button onClick={() => props.handleToggle(props.id)}>
      {props.isDone ? 'DONE' : 'TODO'}
    </button>
  );
};

const Delete = (props) => {
  return <button onClick={() => props.handleDelete(props.id)}>DELETE</button>;
};

const InputTodo = (props) => {
  return (
    <input type="text" value={props.value} onChange={props.handleInput}></input>
  );
};

const TodoList = (props) => {
  const todos = props.todos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        handleToggle={props.handleToggle}
        handleDelete={props.handleDelete}
      />
    );
  });

  return <ul>{todos}</ul>;
};

const AddTodo = (props) => {
  return (
    <div>
      <InputTodo value={props.newTodo} handleInput={props.handleInput} />
      <button onClick={props.handleAdd}>ADD</button>
    </div>
  );
};

const App = () => {
  const initialTodoState = {
    newTodo: '',
    nextId: 1,
    todos: [],
  };

  const [todoState, todoDispatch] = useReducer(todoReducer, initialTodoState);

  const handleDelete = useCallback((id) => {
    todoDispatch({ type: 'delete', id: id });
  }, []);
  const handleToggle = useCallback((id) => {
    todoDispatch({ type: 'toggle', id: id });
  }, []);
  const handleAdd = useCallback(() => {
    todoDispatch({ type: 'add' });
  }, []);
  const handleInput = useCallback((e) => {
    todoDispatch({ type: 'input', value: e.target.value });
  }, []);

  return (
    <div>
      <h1>MY TODO</h1>
      <TodoList
        todos={todoState.todos}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
      />
      <AddTodo
        newTodo={todoState.newTodo}
        handleAdd={handleAdd}
        handleInput={handleInput}
      />
    </div>
  );
};

// ========================================

ReactDOM.render(<App />, document.getElementById('root'));
