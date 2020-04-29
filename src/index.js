import Todo from './Todo';
import Project from './Project';
import TodoElement from './TodoElement';
import TodoForm from './TodoForm';
import View from './View';
import App from './App';

// testing
// const testProject = new Project('Home', 'Around the house', );
// const testProject2 = new Project('Web Dev', 'Javascript projects', )

// App.addProject(testProject);
// App.addProject(testProject2);

// const test = new Todo(
//   0,
//   'Make a todo app',
//   'Make a Javascript app that fulfills the requirements for The Odin Project\'s Todo App project.',
//   'today',
//   5,
//   true,
// );




// testProject.addTodo(test);

// window.View = View;
window.App = App;




document.addEventListener("DOMContentLoaded", () => {

  App.loadApp();

});