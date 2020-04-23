import Project from "./Project";
import IconInserter from "./IconInserter";
import TodoForm from './TodoForm';

class Todo {
  constructor (id, title, description, dueDate, priority, completed, project = null) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.project = project;
    this.renderMode = 'display';
  }
  getId() { return this.id; }
  getTitle() { return this.title; }
  getDescription() { return this.description; }
  getDueDate() { return this.dueDate; }
  getPriority() { return this.priority; }
  getCompleted() { return this.completed; }
  getProject() { return this.project; }

  setTitle(newTitle) {
    this.title = newTitle;
  }
  setDescription(newDescription) {
    this.description = newDescription;
  }
  setDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }
  setPriority(newPriority) {
    this.priority = newPriority;
  }
  setCompleted(newCompleted) {
    this.completed = newCompleted;
  }
  setProject(newProject) {
    this.project = newProject;
  }

  toggleCompleted() {
    this.completed = !this.completed;
    this.project.refresh();
  }

  deleteSelf() {
    this.project.removeTodo(this);
    this.project.refresh();
  }
  editSelf() {
    // hacky way: delete and replace with a form
    // TODO: temporarily hide and replace only when submitted. Also add a cancel button.
    // tell project to rerender
    this.renderMode = 'edit'
    this.project.refresh();
  }

  render () {

    if (this.renderMode === 'edit') {
      return TodoForm(this).render(this.project);

    } else if (this.renderMode === 'display') {

      const container = document.createElement('div');
      container.classList.add('todo');

      let element;
      
      // completed
      element = document.createElement('button');
      element.classList.add('checkbox');
      element.classList.add('completed');
      element.appendChild(IconInserter.render('done'));
      if (!this.completed) {
        element.classList.add('unchecked');
      }
      element.addEventListener('click', () => {
        this.toggleCompleted();
      })

      container.appendChild(element);

      // delete
      element = document.createElement('button');
      element.classList.add('delete');
      element.appendChild(IconInserter.render('delete'));
      element.addEventListener('click', () => {
        this.deleteSelf();
      });
      container.appendChild(element);

      // title
      element = document.createElement('h2');
      element.textContent = this.title;

      container.appendChild(element);

      // edit
      element = document.createElement('button');
      element.classList.add('edit');
      element.appendChild(IconInserter.render('edit'));
      element.addEventListener('click', () => {
        this.editSelf();
      });
      container.appendChild(element);

      // due date
      if (this.dueDate) {
        element = document.createElement('span');
        element.classList.add('dueDate');
        element.appendChild(IconInserter.render('schedule'));
        
        const time = document.createElement('time');
        time.textContent = this.dueDate;
        element.appendChild(time);
        
        container.appendChild(element);
      }
      // priority
      if (this.priority) {
        element = document.createElement('p');
        element.classList.add('priority');
        element.textContent = this.priority;
        container.appendChild(element);
      }
      // description
      if (this.description) {
        element = document.createElement('p');
        element.classList.add('description');
        element.textContent = this.description;
        container.appendChild(element);
      }
      


      return container;
    }
  }
}





export default Todo;




