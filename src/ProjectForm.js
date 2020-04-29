import Project from './Project';
import IconInserter from './IconInserter';
import View from './View';
import App from './App';

class ProjectForm { // TODO: generalize this and use it for todos too
  constructor(project = null, displayMode = 'addButton') {
    this.project = project;
    this.displayMode = displayMode;
    this.prefix = 'project';
    this.suffix = 'new';
    this.defaults = {
      title: '',
      description: '',
    };
    if (project) {
      this.suffix = project.getId().toString();
      this.defaults = {
        title: project.getTitle(),
        description: project.getDescription(),
      };
    }
  }

  renderAddButton() {
    const container = document.createElement('a');
    container.classList.add('addProject');
    container.appendChild(IconInserter.render('add'));

    const text = document.createElement('span');
    text.textContent = 'Add project';

    container.appendChild(text);


    container.addEventListener('click', () => {
      this.displayMode = 'form';
      this.sendViewRefresh();
    })

    return container;

  }


  renderForm() {
    const container = document.createElement('div');
    container.classList.add('form');
    container.classList.add('addProject');


    const titleField = new TextField('title', this.prefix, this.suffix, this.defaults.title);
    titleField.appendToContainer(container);

    const descriptionField = new TextField('description', this.prefix, this.suffix, this.defaults.description);
    descriptionField.appendToContainer(container);

    let element = new Button('cancel', () => {this.cancelForm()}, ['cancel']);
    element.appendToContainer(container);

    let submitButtonText = 'add';
    if (this.project) {
      element = new Button('delete', () => {this.deleteProject()}, ['delete']);
      element.appendToContainer(container);
      submitButtonText = 'edit';
    }

    element = new Button(submitButtonText, () => {this.addProject()});
    element.appendToContainer(container);


    return container;
  }

  cancelForm() {
    if (this.project) {
      // tell the project to render as display again
      this.project.setDisplayMode('display');
    } else {
      this.displayMode = 'addButton';
    }
    this.sendViewRefresh();
  }

  deleteProject() {
    this.project.deleteSelf();
    this.displayMode = 'hidden';
    this.sendViewRefresh(); // is this not working? START HERE 
  }

  addProject() {
    let fieldId = camelConcat(this.prefix, 'title', this.suffix);
    let title = document.getElementById(fieldId).value; // TODO: generalize this for all Forms
    if (title === '') {
      title = '(unnamed project)';
    }
    fieldId = camelConcat(this.prefix, 'description', this.suffix);
    const description = document.getElementById(fieldId).value;

    if (this.project) {
      this.updateProject(title, description);
    } else {
      App.addProject(new Project(title, description));
    }
    this.sendViewRefresh();
  }

  updateProject(title, description) {
    this.project.setTitle(title);
    this.project.setDescription(description);
    this.project.setDisplayMode('display');
    this.sendViewRefresh();
  }

  sendViewRefresh() {
    if (this.suffix === 'new') { 
      View.setAddProjectForm(this);
    }
    View.refreshView();
  }

  render() {
    if (this.displayMode === 'addButton') {
      return this.renderAddButton();
    } else if (this.displayMode === 'form') {
      return this.renderForm();
    } else if (this.displayMode === 'hidden') {
      return false;
    }
  }
}


class TextField {
  constructor(name, prefix = '', suffix = '', value = '') {
    this.name = name;
    this.id = camelConcat(prefix, name, suffix);
    this.value = value.toString(); // TODO: any reason to make this null when not specified?
  }

  renderLabel() {
    const label = document.createElement('label');
    label.setAttribute('for', this.id);
    label.textContent = this.name;
    return label;
  }

  renderField() {
    const field = document.createElement('input');
    field.setAttribute('type', 'text');
    field.setAttribute('id', this.id);
    field.setAttribute('name', this.id);
    field.setAttribute('value', this.value);
    return field;
  }
  render() {
    return [this.renderLabel, this.renderField];
  }
  appendToContainer(container) {
    container.appendChild(this.renderLabel());
    container.appendChild(this.renderField());
  }


}

class Button {
  constructor(text, action = null, classes = null) {
    this.text = text;
    if (action) {
      this.action = action;
    }
    if (classes) {
      this.classes = classes;
    }
  }

  renderButton() {
    const button = document.createElement('button');
    button.textContent = this.text;
    if (this.action) {
      button.addEventListener('click', () => {
        this.action();
      });
    }
    if (this.classes) {
      for (let i=0; i<this.classes.length; i++) {
        button.classList.add(this.classes[i]);
      }
    }

    return button;
  }

  appendToContainer(container) {
    const button = this.renderButton();
    container.appendChild(button);
  }
}

function camelConcat() { // TODO: decide which namespace this should live in!
  if (arguments.length < 2) return arguments;

  let newString = arguments[0];
  for (let i=1; i<arguments.length; i++) {
    newString += arguments[i].slice(0, 1).toUpperCase();
    newString += arguments[i].slice(1);
  }
  return newString;
}

window.camelConcat = camelConcat;

export default ProjectForm;