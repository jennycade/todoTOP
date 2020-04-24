import View from './View';
import App from './App';

class Project {
  constructor (title, description) {
    this.id = App.incrementProjectId();
    this.title = title;
    this.description = description;
    this.todos = [];
  }

  getId() { return this.id; }
  setTitle (newTitle) {
    this.title = newTitle;
  }
  setDescription (newDescription) {
    this.description = newDescription;
  }
  setSortOrder (newSortOrder) {
    this.sortOrder = newSortOrder;
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

  refresh () {
    View.refreshView(); // TODO: refresh single project
  }

  render () {
    const container = document.createElement('div');
    container.classList.add('projectList');

    // header
    const header = document.createElement('header');
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

