import Todo from './Todo';
import Project from './Project';
import TodoElement from './TodoElement';
import TodoForm from './TodoForm';
import View from './View';
import App from './App';

// testing
const testProject = new Project(0, 'Home', 'Around the house', );
const testProject2 = new Project(1, 'Web Dev', 'Javascript projects', )

App.addProject(testProject);
App.addProject(testProject2);

// const test = Todo(
//   0,
//   TodoElement('Make a todo app', 'string', 'h2', ''),
//   TodoElement('Make a JavaScript app that fulfills the requirements for The Odin Project\'s Todo App project.', 'string', 'p', ''),
//   TodoElement('today', 'string', 'p', 'Due: '),
//   TodoElement(5, 'string', 'p', 'Priority: '),
//   TodoElement(false, 'checkbox', 'input', ''),
// );

const test = new Todo(
  0,
  'Make a todo app',
  'Make a Javascript app that fulfills the requirements for The Odin Project\'s Todo App project.',
  'today',
  5,
  true,
);




testProject.addTodo(test);

window.View = View;





document.addEventListener("DOMContentLoaded", () => {

  App.loadApp();

});