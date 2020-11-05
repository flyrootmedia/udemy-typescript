import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

// these properties are defined by the API
// NOTE: not all API properties must be included in the interface
// an "interface" defines a "type"
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get(url).then(response => {
  const todo = response.data as Todo;
  const id = todo.id;
  const title = todo.title;
  const completed = todo.completed;

  logTodo(id, title, completed);
});

// note: tried to set target in tsconfig to compile es2015 so I could
// use async/await, but then was still getting errors. For the sake of
// getting on with the course I'm not worrying about it for now.

// define type arguments are expecting
const logTodo = (id: number, title: string, completed: boolean) => {
  console.log(`
    The Todo with ID: ${id}
    Has a title of ${title}
    Is is completed? ${completed}
  `);
};
