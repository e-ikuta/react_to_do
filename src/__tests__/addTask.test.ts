import {
  TodoState,
  addTask,
} from '../todoReducer';

describe('addTask', () => {
  it('stateを受け取り、stateに新しいtaskを追加する', () => {
    const originalState: TodoState = {
      newTodo: 'something to do',
      nextId: 1,
      todos: [],
    };
    expect(addTask(originalState)).toEqual({
      newTodo: '',
      nextId: 2,
      todos: [
        {
          id: 1,
          name: 'something to do',
          isDone: false,
        },
      ],
    })
  });
});

