import * as React from 'react';
import { useReducer, useCallback } from 'react';
import * as ReactDOM from 'react-dom';
import { TodoState, Todo, todoReducer } from './todo-reducer';

type TodoProps = {
  todo: Todo;
  handleToggle: HandleToggle;
  handleDelete: HandleDelete;
};

const Todo: React.FC<TodoProps> = (props) => {
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

type DoneMarkProps = {
  id: number;
  isDone: boolean;
  handleToggle: HandleToggle;
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
  handleDelete: HandleDelete;
};

const Delete: React.FC<DeleteProps> = (props) => {
  return <button onClick={() => props.handleDelete(props.id)}>DELETE</button>;
};

type InputTodoProps = {
  value: string;
  handleInput: HandleInput;
};

const InputTodo: React.FC<InputTodoProps> = (props) => {
  return (
    <input type="text" value={props.value} onChange={props.handleInput}></input>
  );
};

type TodoListProps = {
  todos: Todo[];
  handleToggle: HandleToggle;
  handleDelete: HandleDelete;
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
  handleInput: HandleInput;
  handleAdd: HandleAdd;
};

const AddTodo: React.FC<AddTodoProps> = (props) => {
  return (
    <div>
      <InputTodo value={props.newTodo} handleInput={props.handleInput} />
      <button onClick={props.handleAdd}>ADD</button>
    </div>
  );
};

type HandleDelete = (id: number) => void;
type HandleToggle = (id: number) => void;
type HandleAdd = (e: React.MouseEvent<HTMLButtonElement>) => void;
type HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => void;

const App = () => {
  const initialTodoState: TodoState = {
    newTodo: '',
    nextId: 1,
    todos: [],
  };

  const [todoState, todoDispatch] = useReducer(todoReducer, initialTodoState);

  const handleDelete: HandleDelete = useCallback((id) => {
    todoDispatch({ type: 'delete', payload: { id: id }});
  }, []);
  const handleToggle: HandleToggle = useCallback((id) => {
    todoDispatch({ type: 'toggle', payload: { id: id }});
  }, []);
  const handleAdd: HandleAdd = useCallback(() => {
    todoDispatch({ type: 'add' });
  }, []);
  const handleInput: HandleInput = useCallback((e) => {
    todoDispatch({ type: 'input', payload: { value: e.target.value }});
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
