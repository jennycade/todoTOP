import View from './View';

class Project {
  constructor (id, title, description, sortOrder = 0, todos = []) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.sortOrder = sortOrder;
    this.todos = todos;
  }

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
  removeTodo (todo) {
    // find it in the list
    let toreturn = false;
    for (let i=0; i<this.todos.length; i++) {
      if (todo === this.todos[i]) {
        toreturn = this.todos.splice(i, 1); // returns the todo, in case it matters
        break;
      }
    }
    
    this.refresh();
    return toreturn;
  }

  refresh () {
    View.refreshView(); // TODO: refresh single project
  }

  render () {
    // TODO: consider cleaning this up with something like ToDoElement
    const container = document.createElement('div');
    container.classList.add('projectList');
    // header
    const header = document.createElement('h1');
    header.textContent = this.title;
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

