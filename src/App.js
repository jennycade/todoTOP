import View from "./View";


const App = (() => {
  let projects = [];

  const addProject = (project) => {
    projects.push(project);
  }

  const loadApp = () => {
    for (let i=0; i < projects.length; i++) {
      View.loadProject(projects[i]);
    }
  }


  return {
    projects,
    addProject,
    loadApp,
  }
})();

export default App;