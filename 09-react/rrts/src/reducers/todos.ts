import { Todo, Action, ActionTypes } from '../actions';

// NOTE: the union of action types is defined as "Action" in actions/types.ts

export const todosReducer = (
  state: Todo[] = [], 
  action: Action
) => {
  // note the switch acts as a type guard for the specific action types 
  switch (action.type) {
    case ActionTypes.fetchTodos:
      return action.payload;
    case ActionTypes.deleteTodo:
      return state.filter((todo: Todo) => todo.id !== action.payload);
    default:
      return state;
  }
};