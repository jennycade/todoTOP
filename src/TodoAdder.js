import Todo from './Todo';

const TodoAdder = (() => {

  const processForm = (project) => { // TODO: add edit
    const title = document.getElementById('titleField').value;
    const description = document.getElementById('descriptionField').value;
    const dueDate = document.getElementById('dueDateField').value;
    const priority = document.getElementById('priorityField').value;

    // TODO: validate

    const newTodo = new Todo(0, title, description, dueDate, priority, false);

    project.addTodo(newTodo);
    project.refresh();
  }

  return {
    processForm,
  }
})();

export default TodoAdder;