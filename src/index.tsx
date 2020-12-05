import * as React from 'react';
import { useReducer, useCallback } from 'react';
import * as ReactDOM from 'react-dom';
import {
  TodoState,
  Todo,
  todoReducer,
  deleteAction,
  addAction,
  toggleAction,
  inputAction,
} from './todoReducer';
import styled from 'styled-components';
import classnames from 'classnames';

type TodoProps = {
  todo: Todo;
  handleToggle: handleToggle;
  handleDelete: handleDelete;
};

const Text = styled.span`
  color: #3b8c69;
`;

const Todo: React.FC<TodoProps> = (props) => {
  return (
    <li>
      <DoneMark
        id={props.todo.id}
        isDone={props.todo.isDone}
        handleToggle={props.handleToggle}
      />
      <Text className={classnames({ done: props.todo.isDone })}>
        {props.todo.name}
      </Text>
      <Delete id={props.todo.id} handleDelete={props.handleDelete} />
    </li>
  );
};

type DoneMarkProps = {
  id: number;
  isDone: boolean;
  handleToggle: handleToggle;
};

const DoneMark: React.FC<DoneMarkProps> = (props) => {
  return (
    <button onClick={() => props.handleToggle(props.id)}>
      {props.isDone ? 'DONE' : 'TODO'}
    </button>
  );
};

type DeleteProps = {
  id: number;
  handleDelete: handleDelete;
};

const Delete: React.FC<DeleteProps> = (props) => {
  return <button onClick={() => props.handleDelete(props.id)}>DELETE</button>;
};

type InputTodoProps = {
  value: string;
  handleInput: handleInput;
};

const InputTodo: React.FC<InputTodoProps> = (props) => {
  return (
    <input type="text" value={props.value} onChange={props.handleInput}></input>
  );
};

type TodoListProps = {
  todos: Todo[];
  handleToggle: handleToggle;
  handleDelete: handleDelete;
};

const TodoList: React.FC<TodoListProps> = (props) => {
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

type AddTodoProps = {
  newTodo: string;
  handleInput: handleInput;
  handleAdd: handleAdd;
};

const AddTodo: React.FC<AddTodoProps> = (props) => {
  return (
    <div>
      <InputTodo value={props.newTodo} handleInput={props.handleInput} />
      <button onClick={props.handleAdd}>ADD</button>
    </div>
  );
};

type handleDelete = (id: number) => void;
type handleToggle = (id: number) => void;
type handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => void;
type handleInput = (e: React.ChangeEvent<HTMLInputElement>) => void;

const App = () => {
  const initialTodoState: TodoState = {
    newTodo: '',
    nextId: 1,
    todos: [],
  };

  const [todoState, todoDispatch] = useReducer(todoReducer, initialTodoState);

  const handleDelete: handleDelete = useCallback((id) => {
    todoDispatch(deleteAction(id));
  }, []);
  const handleToggle: handleToggle = useCallback((id) => {
    todoDispatch(toggleAction(id));
  }, []);
  const handleAdd: handleAdd = useCallback(() => {
    todoDispatch(addAction());
  }, []);
  const handleInput: handleInput = useCallback((e) => {
    todoDispatch(inputAction(e.target.value));
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
