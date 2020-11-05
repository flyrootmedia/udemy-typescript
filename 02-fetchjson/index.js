"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var url = 'https://jsonplaceholder.typicode.com/todos/1';
axios_1["default"].get(url).then(function (response) {
    var todo = response.data;
    var id = todo.id;
    var title = todo.title;
    var completed = todo.completed;
    logTodo(id, title, completed);
});
// note: tried to set target in tsconfig to compile es2015 so I could
// use async/await, but then was still getting errors. For the sake of
// getting on with the course I'm not worrying about it for now.
// define type arguments are expecting
var logTodo = function (id, title, completed) {
    console.log("\n    The Todo with ID: " + id + "\n    Has a title of " + title + "\n    Is is completed? " + completed + "\n  ");
};
