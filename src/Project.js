import View from './View';
import App from './App';
import ProjectForm from './ProjectForm';

class Project {
  constructor (title, description) {
    this.id = App.incrementProjectId();
    this.title = title;
    this.description = description;
    this.todos = [];
    this.displayMode = 'display';
  }

  getId() { return this.id; }
  getTitle() { return this.title; }
  getDescription() { return this.description; }

  setTitle (newTitle) {
    this.title = newTitle;
  }
  setDescription (newDescription) {
    this.description = newDescription;
  }
  setSortOrder (newSortOrder) {
    this.sortOrder = newSortOrder;
  }
  setDisplayMode(newDisplayMode) {
    this.displayMode = newDisplayMode;
  }

  saveProject() {
    let projectToSave = {
      id: this.id,
      title: this.title,
      description: this.description,
      todos: [],
    }
    for (let i=0; i<this.todos.length; i++) {
      projectToSave.todos.push(this.todos[i].saveTodo());
    }
    return JSON.stringify(projectToSave);

  }
  
  addTodo (todo) {
    todo.setProject(this);
    this.todos.push(todo);

  }

  getTodoById(todoId) {
    let toReturn = false;
    for (let i=0; i<this.todos.length; i++) {
      if (todoId === this.todos[i].id) {
        toReturn = this.todos[i];
        break;
      }
    }
    return toReturn;
  }

  removeTodo (todo) {
    // find it in the list
    let toreturn = false;
    for (let i=0; i<this.todos.length; i++) {
      if (todo === this.todos[i]) {
        toreturn = this.todos.splice(i, 1); // returns the todo, in case it matters
        break;
      }
    }
    
    // this.refresh();
    return toreturn;
  }

  deleteSelf() {
    App.removeProject(this);
  }

  refresh () {
    View.refreshView(); // TODO: refresh single project
  }

  render () {
    const container = document.createElement('div');
    container.classList.add('projectList');

    // header
    const header = document.createElement('header');

    if (this.displayMode === 'display') {
      const title = document.createElement('h1');
      title.textContent = this.title;

      header.appendChild(title);

      const todoCount = document.createElement('span');
      todoCount.textContent = `${this.todos.length.toString()} item${(this.todos.length !== 1) ? 's' : ''}`;
      header.appendChild(todoCount);

      const description = document.createElement('p');
      description.classList.add('description');
      description.textContent = this.description;
      header.appendChild(description);

      // bring up edit form when clicking the header
      header.classList.add('clickable');
      header.addEventListener('click', () => {
        this.form = new ProjectForm(this, 'form');
        this.displayMode = 'form';
        this.refresh();
      });
    } else if (this.displayMode === 'form') {
      container.appendChild(this.form.render());
    }

    container.appendChild(header);

    // add each todo
    for (let i=0; i<this.todos.length; i++) {
      // add each todo
      container.appendChild(this.todos[i].render());
    }

    

    return container;
    
  }
}

export default Project;

