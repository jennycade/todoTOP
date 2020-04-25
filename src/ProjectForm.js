import Project from './Project';
import IconInserter from './IconInserter';
import View from './View';

class ProjectForm {
  constructor(project = null, displayMode = 'addButton') {
    this.project = project;
    this.displayMode = displayMode;
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
      View.setAddProjectForm(this);
      View.refreshView();
    })

    return container;

  }

  renderForm() {
    const container = document.createElement('form');

    let field = new TextField('title', 'project', this.suffix);
    field.appendToContainer(container);

    return container;
  }

  addProject() {

  }

  updateProject() {

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

  camelConcat() {
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


export default ProjectForm;