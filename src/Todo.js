import Project from "./Project";
import IconInserter from "./IconInserter";
import TodoForm from './TodoForm';
import App from './App';

class Todo {
  constructor (id, title, description, dueDate, priority, completed, project = null) {
    this.id = App.incrementTodoId();
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
    this.project.refresh(); // TODO: move calls to this.project.refresh() to the eventlisteners so I stop accidentally adding them here and in the project.
  }

  deleteSelf() {
    this.project.removeTodo(this);
    this.project.refresh();
  }
  editSelf() {
    // TODO: Also add a cancel button.
    this.renderMode = 'edit'
    this.project.refresh();
  }
  update(title, description, dueDate, priority) {
    this.setTitle(title);
    this.setDescription(description);
    this.setDueDate(dueDate);
    this.setPriority(priority);

    this.renderMode = 'display';
    this.project.refresh();
  }

  cancelEdit() {
    this.renderMode = 'display';
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

      // MAIN INFO
      let section = document.createElement('div');
      section.classList.add('mainInfo');

      // title
      element = document.createElement('h2');
      element.textContent = this.title;

      section.appendChild(element);

      // edit
      element = document.createElement('button');
      element.classList.add('edit');
      element.appendChild(IconInserter.render('edit'));
      element.addEventListener('click', () => {
        this.editSelf();
      });
      section.appendChild(element);

      // delete
      element = document.createElement('button');
      element.classList.add('delete');
      element.appendChild(IconInserter.render('delete'));
      element.addEventListener('click', () => {
        this.deleteSelf();
      });
      section.appendChild(element);

      container.appendChild(section);

      // DETAILS
      section = document.createElement('div');
      section.classList.add('details');

      // due date
      if (this.dueDate) {
        element = document.createElement('span');
        element.classList.add('dueDate');
        element.appendChild(IconInserter.render('schedule'));
        
        const time = document.createElement('time');
        time.textContent = this.dueDate;
        element.appendChild(time);
        
        section.appendChild(element);
      }
      // priority
      if (this.priority) {
        element = document.createElement('span');
        element.classList.add('priority');
        element.textContent = this.priority;
        section.appendChild(element);
      }
      // description
      if (this.description) {
        element = document.createElement('p');
        element.classList.add('description');
        element.textContent = this.description;
        section.appendChild(element);
      }

      container.appendChild(section);
      


      return container;
    }
  }
}





export default Todo;




