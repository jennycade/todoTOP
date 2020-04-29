import View from "./View";
import Project from "./Project";
import Todo from './Todo';
import TodoForm from "./TodoForm";


const App = (() => {
  let projects = [];
  let todoId = 0;
  let projectId = 0;

  const saveProjects = () => {
    let projectsToSave = []
    for (let i=0; i<projects.length; i++) {
      projectsToSave.push(projects[i].saveProject());
    }
    localStorage.setItem('projects', JSON.stringify(projectsToSave));
  }

  const loadProjectsFromStorage = () => { // TODO: make an class to handle all object loading, so App doesn't need to know exactly how to do it
    let projectsToLoad = JSON.parse(localStorage.getItem('projects'));

    for (let i=0; i<projectsToLoad.length; i++) {
      const x = JSON.parse(projectsToLoad[i]);
      const project = new Project(
        x.title,
        x.description
      );
      for (let j=0; j<x.todos.length; j++) {
        const y = JSON.parse(x.todos[j]);
        const todo = new Todo(
          y.title,
          y.description,
          y.dueDate,
          y.priority,
          y.completed,
        );
        project.addTodo(todo);
      }
      addProject(project);
    }
  }

  const addProject = (project) => {
    projects.push(project);
  }

  const removeProject = (project) => {
    let toreturn = false;
    for (let i=0; i<projects.length; i++) {
      if (project === projects[i]) {
        toreturn = projects.splice(i, 1); // returns the todo, in case it matters
        break;
      }
    }
    return toreturn;
  }

  const loadApp = () => {
    View.loadAddProjectForm();
    if (projects.length === 0) {
      // check localStorage
      if (localStorage.getItem('projects')) {
        loadProjectsFromStorage();
      } else {
        // add a default project
        addProject(new Project('Default', 'This is the default project. Click to edit.'));
      }
    } else {
      // save to localStorage
      saveProjects();
    }
    for (let i=0; i < projects.length; i++) {
      View.loadProject(projects[i]);
    }
  }

  const incrementProjectId = () => {
    projectId++;
    return projectId;
  }
  const incrementTodoId = () => {
    // gets called anytime a new todo is created, to assign unique IDs throughout app (i.e. among different projects)
    todoId ++;
    return todoId;
  }


  return {
    projects,
    addProject, removeProject,
    loadApp,
    incrementProjectId, incrementTodoId,
  }
})();

export default App;