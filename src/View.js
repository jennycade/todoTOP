import TodoForm from './TodoForm';
import Project from './Project';
import App from './App';

const View = (() => {
  let appDiv;
  
  const loadView = () => {
    // console.log('Loading view');
    appDiv = document.getElementById('app');
    // console.log(appDiv);
  } 

  const loadNewForm = (project) => {
    if (!appDiv) { loadView(); }
    return TodoForm().render(project);
  }

  const loadProject = (project) => { 
    if (!appDiv) { loadView(); }
    const projectDiv = document.createElement('section');
    projectDiv.classList.add('project');

    projectDiv.appendChild(loadNewForm(project));
    projectDiv.appendChild(project.render());

    appDiv.appendChild(projectDiv);
  }

  const clearView = () => {
    if (!appDiv) { loadView(); }
    while (appDiv.firstChild) {
      appDiv.removeChild(appDiv.lastChild);
    }
  }

  const refreshView = () => {
    clearView();
    App.loadApp();
  }

  return {
    loadView,
    loadNewForm,
    loadProject,
    clearView,
    refreshView,
  };

})();

export default View;

