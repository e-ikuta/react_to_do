export { TodoState, Todo, todoReducer };

const ADD_ACTION_TYPE = 'add' as const;
const DELETE_ACTION_TYPE = 'delete' as const;
const TOGGLE_ACTION_TYPE = 'toggle' as const;
const INPUT_ACTION_TYPE = 'input' as const;

type TodoState = {
  newTodo: string;
  nextId: number;
  todos: Todo[];
};

type Todo = {
  id: number;
  name: string;
  isDone: boolean;
};

export const addAction = () => {
  return {
    type: ADD_ACTION_TYPE,
  };
};

export const deleteAction = (id: number) => {
  return {
    type: DELETE_ACTION_TYPE,
    payload: {
      id: id,
    },
  };
};

export const toggleAction = (id: number) => {
  return {
    type: TOGGLE_ACTION_TYPE,
    payload: {
      id: id,
    },
  };
};

export const inputAction = (value: string) => {
  return {
    type: INPUT_ACTION_TYPE,
    payload: {
      value: value,
    },
  };
};

type AddAction = ReturnType<typeof addAction>;
type DeleteAction = ReturnType<typeof deleteAction>;
type ToggleAction = ReturnType<typeof toggleAction>;
type InputAction = ReturnType<typeof inputAction>;

type Action = AddAction | DeleteAction | ToggleAction | InputAction;

const todoReducer = (state: TodoState, action: Action) => {
  switch (action.type) {
    case 'add': {
      return {
        newTodo: '',
        nextId: state.nextId + 1,
        todos: [
          ...state.todos,
          {
            id: state.nextId,
            name: state.newTodo,
            isDone: false,
          },
        ],
      };
    }
    case 'delete': {
      return {
        newTodo: state.newTodo,
        nextId: state.nextId,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }
    case 'toggle': {
      const todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
      return {
        newTodo: state.newTodo,
        nextId: state.nextId,
        todos: todos,
      };
    }
    case 'input': {
      return {
        newTodo: action.payload.value,
        nextId: state.nextId,
        todos: state.todos,
      };
    }
    default: {
      return state;
    }
  }
};
