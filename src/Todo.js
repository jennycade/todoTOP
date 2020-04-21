import Project from "./Project";

const Todo = (id, title, description, dueDate, priority, completed) => {
  const getId = () => id;
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getCompleted = () => completed;
  const getProject = () => project;

  const setTitle = (newTitle) => {
    title = newTitle;
  }
  const setDescription = (newDescription) => {
    description = newDescription;
  }
  const setDueDate = (newDueDate) => {
    dueDate = newDueDate;
  }
  const setPriority = (newPriority) => {
    priority = newPriority;
  }
  const setCompleted = (newCompleted) => {
    completed = newCompleted;
  }
  const setProject = (newProject) => {
    project = newProject;
  }

  const toggleCompleted = () => {
    completed = !completed.value;
  }

  const deleteSelf = () => {
    project.removeTodo(this);
  }

  const render = () => {
    const container = document.createElement('div');
    container.classList.add('todo');

    let element;
    
    // completed
    element = document.createElement('button');
    element.classList.add('checkbox');
    element.textContent = 'v';
    if (completed) {
      element.classList.add('checked');
    }
    element.addEventListener('click', () => {
      toggleCompleted();
    })

    container.appendChild(element);

    // delete
    element = document.createElement('button');

    // title
    element = document.createElement('h2');
    element.textContent = title;

    container.appendChild(element);

    // due date
    if (dueDate) {
      element = document.createElement('time');
      element.classList.add('dueDate');
      element.textContent = dueDate;
      container.appendChild(element);
    }
    // priority
    if (priority) {
      element = document.createElement('p');
      element.classList.add('priority');
      element.textContent = priority;
      container.appendChild(element);
    }
    // description
    if (description) {
      element = document.createElement('p');
      element.classList.add('description');
      element.textContent = description;
      container.appendChild(element);
    }


    return container;
  }
  


  return {
    getId, getTitle, getDescription, getDueDate, getPriority, getCompleted, getProject,
    setTitle, setDescription, setDueDate, setPriority, setCompleted, setProject,
    toggleCompleted,
    render,
  };
}





export default Todo;





// const Todo = (id, title, description, dueDate, priority, completed) => {
//   const getId = () => id;
//   const getTitle = () => title;
//   const getDescription = () => description;
//   const getDueDate = () => dueDate;
//   const getPriority = () => priority;
//   const getCompleted = () => completed;

//   const setTitle = (newTitle) => {
//     title = newTitle);
//   }
//   const setDescription = (newDescription) => {
//     description = newDescription);
//   }
//   const setDueDate = (newDueDate) => {
//     dueDate = newDueDate);
//   }
//   const setPriority = (newPriority) => {
//     priority = newPriority);
//   }
//   const setCompleted = (newCompleted) => {
//     completed = newCompleted);
//   }

//   const toggleCompleted = () => {
//     completed = !completed.value);
//   }

//   const render = () => {
//     const container = document.createElement('div');
//     container.classList.add('todo');
    
//     // completed
//     container.appendChild(completed.render());

//     // title
//     container.appendChild(title.render());

//     // description
//     if (description) {
//       container.appendChild(description.render());
//     }
//     if (dueDate) {
//       container.appendChild(dueDate.render());
//     }
//     if (priority) {
//       container.appendChild(priority.render());
//     }


//     return container;
//   }
  


//   return {
//     getId, getTitle, getDescription, getDueDate, getPriority, getCompleted,
//     setTitle, setDescription, setDueDate, setPriority, setCompleted,
//     toggleCompleted,
//     render,
//   };
// }


