import TodoAdder from './TodoAdder';

const TodoForm = ( existingTodo = null) => {
  let formType = 'add';
  let todoId = null;
  let suffix = '';
  let [title, description, dueDate, priority] = ['title', 'description', 'due date', 'priority'];
  if (existingTodo) {
    todoId = existingTodo.getId();
    suffix = todoId.toString();
    title = existingTodo.getTitle();
    description = existingTodo.getDescription();
    dueDate = existingTodo.getDueDate();
    priority = existingTodo.getPriority().toString();
    formType = 'edit'
    // TODO: pass along `completed` value (otherwise assumes it's incomplete)
  }

  const render = (project) => {
    if (!existingTodo) { // TODO: combine this with above logic
      // sets input field suffixes for adding to a project
      suffix = 'p' + project.getId();
    }

    const container = document.createElement('div');
    container.classList.add('form');

    container.appendChild(FormElement('text', 'titleField' + suffix, title).render());
    container.appendChild(FormElement('text', 'descriptionField' + suffix, description).render());
    container.appendChild(FormElement('text', 'dueDateField' + suffix, dueDate).render());
    container.appendChild(FormElement('text', 'priorityField' + suffix, priority).render());
    
    if (existingTodo) {
      container.appendChild(CancelButton(project, todoId).render());
    }

    container.appendChild(SubmitButton(project, formType, todoId).render());

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

const SubmitButton = (project, type = 'add', todoId = null) => {
  let text;
  let suffix = '';
  if (type === 'add') {
    text = 'add';
  } else if (type === 'edit') {
    text = 'edit';
    suffix = todoId.toString();
  }

  const render = () => {
    const button = document.createElement('button');
    button.classList.add('submit');
    button.setAttribute('id', 'submit' + suffix);
    button.textContent = text;

    button.addEventListener('click', () => {
      TodoAdder.processForm(project, todoId);
    })

    return button;
  }



  return {
    render,
  }
}

const CancelButton = (project, todoId) => {
  const suffix = todoId.toString();

  const render = () => {
    const button = document.createElement('button');
    button.classList.add('cancel');
    button.setAttribute('id', 'cancel' + suffix);
    button.textContent = 'cancel';

    button.addEventListener('click', () => {
      // TODO: give this function to TodoAdder too?
      const todo = project.getTodoById(todoId);
      todo.cancelEdit();
    })

    return button;
  }

  return {
    render,
  }
}


export default TodoForm;