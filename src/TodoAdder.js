import Todo from './Todo';

const TodoAdder = (() => {

  const processForm = (project, todoId = null) => {
    let suffix = 'p' + project.getId().toString();
    if (todoId) {
      suffix = todoId.toString();
    }
    
    const title = document.getElementById('titleField' + suffix).value;
    const description = document.getElementById('descriptionField' + suffix).value;
    const dueDate = document.getElementById('dueDateField' + suffix).value;
    const priority = document.getElementById('priorityField' + suffix).value;

    // TODO: validate

    if (!todoId) {
      const newTodo = new Todo(title, description, dueDate, priority, false);
      project.addTodo(newTodo);
    } else {
      // tell the project to edit the todo?
      const todo = project.getTodoById(todoId);
      todo.update(title, description, dueDate, priority);
    }
    project.refresh();
  }

  return {
    processForm,
  }
})();

export default TodoAdder;