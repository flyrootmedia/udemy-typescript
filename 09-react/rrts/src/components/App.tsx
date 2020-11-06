import React from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

// NOTE: annotating fetchTodos as a Function is a bit of a cheat because the 
// redux type definition files don't understand that we're using Thunk, so it 
// expects an action but the return is a promise. There's just no good way to 
// handle this as of now. 
interface AppProps {
  todos: Todo[];
  fetchTodos: Function; 
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}

// name this with underscore to prevent naming collision with 
// export of connect version. Note, this is a little different than
// standard JS version of React becuase we don't typically export default
// with TS by convention. 
class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    // using component level state here for brevity, but the correct way would be to 
    // have some app level fetching state dispatched by Redux
    this.state = { fetching: false };
  }

  componentDidUpdate(prevProps: AppProps): void {
    // this condition is incomplete because if you click the fetch 
    // button again it will evaluate false and never hide the loading text
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  onButtonClick = (): void => {
    this.props.fetchTodos();
    this.setState({ fetching: true });
  };

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  }

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div key={todo.id} onClick={() => this.onTodoClick(todo.id)}>
          {todo.title}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch</button>
        {this.state.fetching ? 'LOADING' : null}
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
}

export const App = connect(
  mapStateToProps,
  { fetchTodos, deleteTodo }
)(_App);