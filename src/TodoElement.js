// TODO: get rid of this way of doing things. It's not helpful.

const TodoElement = (value, displayType, domElement, prefix = '') => {
  const getValue = () => value;
  const setValue = (newValue) => { value = newValue }

  const render = () => {

    let element;
    switch (displayType) {
      case 'string':
        element = document.createElement(domElement);
        element.textContent = prefix + value;
        break;
      case 'checkbox':
        element = document.createElement('input');
        element.setAttribute('type', 'checkbox');
        element.checked = value;
        break;
    }
    
    return element;
  }
  return {
    getValue,
    setValue,
    render,
  };
}

export default TodoElement;