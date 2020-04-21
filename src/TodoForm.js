const TodoForm = ( existingTodo = null) => {
  // title, description, dueDate, priority, project
  let [title, description, dueDate, priority] = ['title', 'description', 'due date', 'priority'];
  if (existingTodo) {
    // TODO: Make this not a heinous mess.
    title = existingTodo.getTitle().getValue();
    description = existingTodo.getDescription().getValue();
    dueDate = existingTodo.getDueDate().getValue();
    priority = existingTodo.getPriority().getValue();
  }

  const render = (project) => {
    const container = document.createElement('form');
    container.appendChild(FormElement('text', 'titleField', title).render());
    container.appendChild(FormElement('text', 'descriptionField', description).render());
    container.appendChild(FormElement('text', 'dueDateField', dueDate).render());
    container.appendChild(FormElement('text', 'priorityField', priority).render());
    // container.appendChild(FormElement('text', 'projectField', ).render());

    container.appendChild(SubmitButton(project).render());

    return container;
  }

  return {
    render,
  };

}


const FormElement = (type, id, defaultValue = '') => {
  
  const render = () => {
    const element = document.createElement('input');
    element.setAttribute('type', type);
    element.setAttribute('id', id);
    element.setAttribute('value', defaultValue);
    return element;
  }
  return {
    render,
  };
}

const SubmitButton = (project, type = 'add') => {
  const text = (type === 'add') ? 'add' : 'edit';

  const render = () => {
    const button = document.createElement('button');
    button.textContent = text;

    button.addEventListener('click', () => {
      TodoAdder.processForm(project);
    })

    return button;
  }



  return {
    render,
  }
}

import Todo from './Todo';
import TodoElement from './TodoElement';
import View from './View';

const TodoAdder = (() => {
  // takes info from form
  // creates new Todo
  // adds it to project

  const processForm = (project) => {
    const title = document.getElementById('titleField').value;
    const description = document.getElementById('descriptionField').value;
    const dueDate = document.getElementById('dueDateField').value;
    const priority = document.getElementById('priorityField').value;

    // TODO: validate

    const newTodo = Todo(0, title, description, dueDate, priority, false);
    // TODO: make above less horrible. Jesus.

    project.addTodo(newTodo);
    project.refresh();
  }

  return {
    processForm,
  }
})();

export default TodoForm;