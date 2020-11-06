import axios from 'axios';
// NOTE: we found the Dispatch interface existed by simply importing 'redux'
// and exploring its type definition file
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// this is optional in your own apps, but it's an interface 
// to describe the action to pass to dispatch
export interface FetchTodosAction {
  type: ActionTypes.fetchTodos;
  payload: Todo[]
}

export interface DeleteTodoAction {
  type: ActionTypes.deleteTodo;
  payload: number;
}

const url = 'https://jsonplaceholder.typicode.com/todos';

// we use the above interfaces to annotate our action creators and actions
export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Todo[]>(url);

    dispatch<FetchTodosAction>({
      type: ActionTypes.fetchTodos,
      payload: response.data
    })
  }
};

export const deleteTodo = (id: number): DeleteTodoAction => {
  return {
    type: ActionTypes.deleteTodo,
    payload: id
  }
}