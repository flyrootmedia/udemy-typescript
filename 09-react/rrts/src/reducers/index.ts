import { combineReducers } from 'redux';
import { todosReducer } from './todos';
import { Todo } from '../actions';

// this interface will help TS validate that we're always returning 
// the correct type for our reducers
export interface StoreState {
  todos: Todo[];
}

export const reducers = combineReducers<StoreState>({
  todos: todosReducer
});