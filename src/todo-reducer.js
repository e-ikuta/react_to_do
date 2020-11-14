export const todoReducer = (state, action) => {
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
