import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';

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

const initialTodoState = {
  newTodo: '',
  counter: 1,
  todos: [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      return {
        newTodo: '',
        counter: state.counter + 1,
        todos: [
          ...state.todos,
          {
            id: state.counter,
            name: state.newTodo,
            isDone: false,
          },
        ],
      };
    }
    case 'delete': {
      return {
        newTodo: state.newTodo,
        counter: state.counter,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    }
    case 'toggle': {
      const todos = state.todos.map((todo) => {
        if (todo.id === action.id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
      return {
        newTodo: state.newTodo,
        counter: state.counter,
        todos: todos,
      };
    }
    case 'input': {
      return {
        newTodo: action.value,
        counter: state.counter,
        todos: state.todos,
      };
    }
    default: {
      return state;
    }
  }
};

const App = () => {
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
