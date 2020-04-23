import TodoAdder from './TodoAdder';

const TodoForm = ( existingTodo = null) => {
  let formType = 'add';
  let [title, description, dueDate, priority] = ['title', 'description', 'due date', 'priority'];
  if (existingTodo) {
    title = existingTodo.getTitle();
    description = existingTodo.getDescription();
    dueDate = existingTodo.getDueDate();
    priority = existingTodo.getPriority().toString();
    formType = 'edit'
    // TODO: pass along `completed` value (otherwise assumes it's incomplete)
  }

  const render = (project) => {
    const container = document.createElement('div');
    container.classList.add('form');
    
    container.appendChild(FormElement('text', 'titleField', title).render());
    container.appendChild(FormElement('text', 'descriptionField', description).render());
    container.appendChild(FormElement('text', 'dueDateField', dueDate).render());
    container.appendChild(FormElement('text', 'priorityField', priority).render());

    container.appendChild(SubmitButton(project, formType).render());

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



export default TodoForm;