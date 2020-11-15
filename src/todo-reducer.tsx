export { TodoState, Todo, todoReducer };

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

type Action = {
  type: string;
  id?: number;
  value?: string;
};

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
        nextId: state.nextId,
        todos: todos,
      };
    }
    case 'input': {
      return {
        newTodo: action.value,
        nextId: state.nextId,
        todos: state.todos,
      };
    }
    default: {
      return state;
    }
  }
};
