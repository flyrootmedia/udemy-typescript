import { FetchTodosAction, DeleteTodoAction } from './todos';

export enum ActionTypes {
  fetchTodos = 'FETCH_TODOS',
  deleteTodo = 'DELETE_TODO'
}

export type Action = FetchTodosAction | DeleteTodoAction;

// NOTE: you don't HAVE to define the action types as a string. 
// Redux just requires that they be some unique value. So you can 
// skip the assignment and the default behavior of an enum is that 
// an index value will be assignd, so for the below, "fetchTodos" 
// would have a value of 0
// export enum ActionTypesUnassigned {
//   fetchTodos
// }