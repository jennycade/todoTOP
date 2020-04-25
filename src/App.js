import View from "./View";


const App = (() => {
  let projects = [];
  let todoId = 0;
  let projectId = 0;

  const addProject = (project) => {
    projects.push(project);
  }

  const loadApp = () => {
    View.loadAddProjectForm();
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
    addProject,
    loadApp,
    incrementProjectId, incrementTodoId,
  }
})();

export default App;