import TodoForm from './TodoForm';
import Project from './Project';
import App from './App';
import ProjectForm from './ProjectForm';

const View = (() => {
  let appDiv, addProjectForm;

  const setAddProjectForm = (newForm) => {
    addProjectForm = newForm;
  }

  const loadAddProjectForm = () => {
    if (!appDiv) { loadView(); }
    if (!addProjectForm) {
      addProjectForm = new ProjectForm();
    }
    
    appDiv.appendChild(addProjectForm.render());
  }
  
  const loadView = () => {
    appDiv = document.getElementById('app');

    
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
    setAddProjectForm,
    loadAddProjectForm,
    loadView,
    loadNewForm,
    loadProject,
    clearView,
    refreshView,
  };

})();

export default View;

