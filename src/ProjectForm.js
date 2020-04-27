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
    if (project) {
      this.suffix = project.getId();
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


    let element = new TextField('title', this.prefix, this.suffix);
    element.appendToContainer(container);

    element = new TextField('description', this.prefix, this.suffix);
    element.appendToContainer(container);

    element = new Button('cancel', () => {this.cancelForm()}, ['cancel']);
    element.appendToContainer(container);

    element = new Button('add', () => {this.addProject()});
    element.appendToContainer(container);


    return container;
  }

  cancelForm() {
    if (this.project) {
      // tell the project to render as display again
      console.log('cancelForm() with this.project set');
    } else {
      this.displayMode = 'addButton';
    }
    this.sendViewRefresh();
  }

  addProject() {
    let fieldId = camelConcat(this.prefix, 'title', this.suffix);
    const title = document.getElementById(fieldId).value; // TODO: generalize this for all Forms
    fieldId = camelConcat(this.prefix, 'description', this.suffix);
    const description = document.getElementById(fieldId).value;

    if (this.project) {
      this.updateProject(title, description);
    } else {
      App.addProject(new Project(title, description));
    }
    this.sendViewRefresh();
  }

  updateProject() {
    console.log('update the project')
  }

  sendViewRefresh() {
    View.setAddProjectForm(this);
    View.refreshView();
  }

  render() {
    if (this.displayMode === 'addButton') {
      return this.renderAddButton();
    } else if (this.displayMode === 'form') {
      return this.renderForm();
    }
  }
}


class TextField {
  constructor(name, prefix = '', suffix = '') {
    this.name = name;
    this.id = this.camelConcat(prefix, name, suffix);
  }

  camelConcat() { // TODO: decide which namespace this should live in!
    if (arguments.length < 2) return arguments;
  
    let newString = arguments[0];
    for (let i=1; i<arguments.length; i++) {
      newString += arguments[i].slice(0, 1).toUpperCase();
      newString += arguments[i].slice(1);
    }
    return newString;
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

function camelConcat() {
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