import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import { todoReducer } from './todo-reducer.js';

const Todo = (props) => {
  return (
    <li>
      <DoneMark
        id={props.todo.id}
        isDone={props.todo.isDone}
        dispatch={props.dispatch}
      />
      {props.todo.name}
      <Delete id={props.todo.id} dispatch={props.dispatch} />
    </li>
  );
};

const DoneMark = (props) => {
  return (
    <button onClick={() => props.dispatch({ type: 'toggle', id: props.id })}>
      {props.isDone ? 'DONE' : 'TODO'}
    </button>
  );
};

const Delete = (props) => {
  return (
    <button onClick={() => props.dispatch({ type: 'delete', id: props.id })}>
      DELETE
    </button>
  );
};

const InputTodo = (props) => {
  return (
    <input
      type="text"
      value={props.value}
      onChange={() =>
        props.dispatch({ type: 'input', value: event.target.value })
      }
    ></input>
  );
};

const TodoList = (props) => {
  const todos = props.todos.map((todo) => {
    return <Todo key={todo.id} todo={todo} dispatch={props.dispatch} />;
  });

  return <ul>{todos}</ul>;
};

const AddTodo = (props) => {
  return (
    <div>
      <InputTodo value={props.newTodo} dispatch={props.dispatch} />
      <button onClick={() => props.dispatch({ type: 'add' })}>ADD</button>
    </div>
  );
};

const App = () => {
  const initialTodoState = {
    newTodo: '',
    counter: 1,
    todos: [],
  };

  const [todoState, todoDispatch] = useReducer(todoReducer, initialTodoState);

  return (
    <div>
      <h1>MY TODO</h1>
      <TodoList todos={todoState.todos} dispatch={todoDispatch} />
      <AddTodo newTodo={todoState.newTodo} dispatch={todoDispatch} />
    </div>
  );
};

// ========================================

ReactDOM.render(<App />, document.getElementById('root'));
